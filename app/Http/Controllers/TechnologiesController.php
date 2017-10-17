<?php

namespace App\Http\Controllers;

use App\Technologies;
use Illuminate\Http\Request;
use function MongoDB\BSON\toJSON;

class TechnologiesController extends Controller
{

    public function getAllTechnologies(){
        $Technologies = new Technologies();
        $technologies = $Technologies->getAllTechnologies();
        return response()
            ->json($technologies)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Max-Age', '1000')
            ->header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, X-CSRF-TOKEN')
            ;

    }

    public function saveTechnology(){
        $input = \Request::all();
        $Technologies = new Technologies();

        if ($_POST['data']){
            $data = json_decode($_POST['data'], true);
            if(isset($_FILES['image']) && $data['img'] != 'http://sunrise.loc/images/technologies/holder_technology.png'){
                $target_dir = 'images/technologies/';
                $info = pathinfo($_FILES["image"]["name"]);
                $rand = md5(microtime());
                $name = "$rand.".$info['extension'];
                $target_file = $target_dir . $name;
                $data['img'] = 'http://sunrise.loc/'. $target_file;
            }

            if(!isset($data['id']) && $data['name'] != ''){
                $technology = $Technologies->createTechnology($data);
                if(isset($_FILES['image'])){
                    $this->uploaded_file($technology, $_FILES['image']);
                }
                return $this->returnResponse($technology);
            }
            elseif (isset($data['id']) && $data['name'] != '') {
                $technologyForOldImage = $Technologies->technologyById($data['id']);
                $save = $Technologies->saveTechnology($data);
                if(isset($save)){
                    $technology = $Technologies->technologyById($data['id']);
                    if ($technologyForOldImage['img'] != $technology['img']) {
                        $this->deleteImages($technologyForOldImage['img']);
                    }
                    if(isset($_FILES['image'])){
                        $this->uploaded_file($technology, $_FILES['image']);
                    }
                    return $this->returnResponse($technology);
                }
            }
        }
        return $this->returnResponse(false);
    }

    private function uploaded_file($technology, $file){
        if(isset($technology) && isset($technology['img']) && $technology['img'] != 'http://sunrise.loc/images/technologies/holder_technology.png'){
            $target_file =  str_replace("http://sunrise.loc/", "", $technology['img']);
            move_uploaded_file($file["tmp_name"], $target_file);
        }
    }

    public function deleteTechnology() {
        $input = \Request::all();
        if (isset($input[0])) {
            $Technologies = new Technologies();
            $technology = $Technologies->technologyById($input[0]);
            $del = $Technologies->deleteTechnologyById($input[0]);
            if ($del == true) {
                $this->deleteImages($technology['img']);
                return $this->returnResponse($technology);
            }
        }
        return $this->returnResponse(false);
    }

    private function deleteImages($src) {
        $delFile = str_replace("http://sunrise.loc/", "", $src);
        if($delFile != 'images/technologies/holder_technology.png') {
            unlink($delFile);
        }
    }

    private function returnResponse($response){
        return response()
            ->json($response);
    }
}
