<?php

namespace App\Http\Controllers;

use App\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function getTeam(){
        $Team = new Team();
        $team = $Team->getTeam();
        return response()
            ->json($team)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Max-Age', '1000')
            ->header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, X-CSRF-TOKEN')
            ;

    }

    public function saveEmployee() {
        $input = \Request::all();
//        dd($_FILES['image']['name']);
        $Team = new Team();
        if (isset($input['data'])) {
            $employeeData = json_decode($input['data'], true);
            $image = [];
            if (isset($_FILES['image'])) {
                $target_dir = 'images/team/';
                $info = pathinfo($_FILES['image']['name']);//Забираем информацию о фале
                $rand = md5(microtime());//Генерируем и уникальное имя для файла
                $name = "$rand.".$info['extension'];//указываем имя + расширение ($info['extension'])
                $target_file = $target_dir . $name;//Присваиваем путь к папке + имя файла
                $employeeData['image'] = 'http://sunrise.loc/'. $target_file;//Присваиваем ссылку для бд
                $image = array(
                    'target_file' => $target_file,
                    'file' => $_FILES['image']
                );
            }

            if (!isset($employeeData['id'])) {
                $employee = $Team->createEmployee($employeeData);
                if (isset($employee)) {
                    if ($image != []) {
                        move_uploaded_file($image['file']['tmp_name'], $image['target_file']);
                    }
                    return response()->json($employee);
                }
            }
            else if (isset($employeeData['id'])) {
                $oldDataEmployee = $Team->getEmployeeById($employeeData['id']);
                $updateEmployee = $Team->updateDataEmployee($employeeData);
                if ($updateEmployee == true) {
                    $newDataEmployee = $Team->getEmployeeById($employeeData['id']);
                    if (($image != []) && ($oldDataEmployee['image'] != $employeeData['image'])) {
                        if ($oldDataEmployee['image'] != 'http://sunrise.loc/images/team/holder_man.png') {
                            $delFile = str_replace("http://sunrise.loc/", "", $oldDataEmployee['image']);
                            unlink($delFile);
                        }
                        move_uploaded_file($image['file']['tmp_name'], $image['target_file']);
                    }
                    return response()->json($newDataEmployee);
                }
            }
        }
        return response()->json(false);
    }

}
