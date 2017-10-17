<?php

namespace App\Http\Controllers;

use App\About;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function getAbout(){
        $About = new About();
        $about = $About->getAbout();
        return response()
            ->json($about)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Max-Age', '1000')
            ->header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, X-CSRF-TOKEN')
            ;

    }

    public function saveAbout() {
        $input = \Request::all();
        $About = new About();

        if (isset($input['about'])) {
            $about = json_decode($input['about'], true);

            $images = [];
            if(isset($_FILES)) {
                $target_dir = 'images/about/';
                $i = 0;
                foreach($_FILES as $key => $value) {
                    $info = pathinfo($value["name"]);//Забираем информацию о фале
                    $rand = md5(microtime());//Генерируем и уникальное имя для файла
                    $name = "$rand.".$info['extension'];//указываем имя + расширение ($info['extension'])
                    $target_file = $target_dir . $name;//Присваиваем путь к папке + имя файла
                    $save_url_bd = 'http://sunrise.loc/'. $target_file;//Присваиваем ссылку для бд

                    $images[$i] = array(
                        'target_file' => $target_file,
                        'save_url_bd' => $save_url_bd,
                        'file' => $value
                    );
                    $i++;
                }
            }

            $imagesForBd = '';
            $keyImage = 0;

            for($i = 0; $i < count($about[0]['images']); $i++ ) {
                if (isset($about[0]['images'][$i]['file'])) {
                    if (($i + 1) !=  count($about[0]['images'])) {
                        $imagesForBd .= $images[$keyImage]['save_url_bd'] . ';';
                    }
                    else if (($i + 1) ==  count($about[0]['images'])) {
                        $imagesForBd .= $images[$keyImage]['save_url_bd'];
                    }
                    $keyImage++;
                }
                else if (!isset($about[0]['images'][$i]['file'])) {
                    if (($i + 1) !=  count($about[0]['images'])) {
                        $imagesForBd .= $about[0]['images'][$i]['src'] . ';';
                    }
                    else if (($i + 1) ==  count($about[0]['images'])) {
                        $imagesForBd .= $about[0]['images'][$i]['src'];
                    }
                }
            }

            if (!isset($about[0]['id'])) {
                $newAbout = array(
                    'title' => $about[0]['title'],
                    'description' => $about[0]['description'],
                    'text' => $about[0]['text'],
                    'images' => $imagesForBd
                );
                $aboutResolve = $About->createAbout($newAbout);
                if (isset($aboutResolve)) {
                    $this->uploaded_file($images);
                    if (isset($input['delImages'])) {
                        $this->deliteFile($input['delImages']);
                    }
                    $response = $this->returnResponse($aboutResolve);
                    return $response;
                }
                else {
                    $response = $this->returnResponse(false);
                    return $response;
                }
            }
            else if (isset($about[0]['id'])) {
                $newAbout = array(
                    'id' => $about[0]['id'],
                    'title' => $about[0]['title'],
                    'description' => $about[0]['description'],
                    'text' => $about[0]['text'],
                    'images' => $imagesForBd
                );
                $aboutResolve = $About->updateAbout($newAbout);
                if($aboutResolve == true) {
                    $aboutResolve = $About->getAboutById($about[0]['id']);
                    $this->uploaded_file($images);
                    if (isset($input['delImages'])) {
                        $this->deliteFile($input['delImages']);
                    }
                    $response = $this->returnResponse($aboutResolve);
                    return $response;
                }
                else {
                    $response = $this->returnResponse(false);
                    return $response;
                }
            }
            $response = $this->returnResponse(false);
            return $response;
        }

    }

    private function uploaded_file($images){
        foreach ($images as $value) {
            move_uploaded_file($value['file']['tmp_name'], $value['target_file']);
        }
    }

    private function deliteFile($delImages) {
        $delImages = json_decode($delImages, true);
        foreach ($delImages as $value) {
            $delFile = str_replace("http://sunrise.loc/", "", $value['src']);
            unlink($delFile);
        }
    }

    private function returnResponse($response){
        return response()
            ->json($response);
    }
}
