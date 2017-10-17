<?php

namespace App\Http\Controllers;

use App\Contacts;
use Illuminate\Http\Request;

class ContactsController extends Controller
{
    public function getAllContacts() {
        $Contacts = new Contacts();
        $contacts = $Contacts->getAllContacts();
        return response()
            ->json($contacts)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->header('Access-Control-Max-Age', '1000')
            ->header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, X-CSRF-TOKEN')
            ;
    }

    public function saveContact() {
        $input = \Request::all();
        $Contacts = new Contacts();
        if (!isset($input['id']) && $input['country'] != '') {
            $contact =  $Contacts->createContact($input);
            if (isset($contact)) {
                return $this->returnResponse($contact);
            }
        }
        else if (isset($input['id']) && $input['country'] != '') {
            $contact = $Contacts->updateContact($input);
            if (isset($contact)) {
                $contact = $Contacts->getContactById($input['id']);
                if(isset($contact)) {
                    return $this->returnResponse($contact);
                }
                else
                {
                    return $this->returnResponse(false);
                }
            }
        }
        return $this->returnResponse(false);
    }

    public function deleteContact() {
        $input = \Request::all();
        if (isset($input[0])) {
            $Contacts = new Contacts();
            $del = $Contacts->deleteContactById($input[0]);
            if ($del == true) {
                return $this->returnResponse($del);
            }
        }
        return $this->returnResponse(false);
    }


    private function returnResponse($response){
        return response()
            ->json($response);
    }
}
