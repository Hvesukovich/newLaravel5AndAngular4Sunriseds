<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contacts extends Model
{
    protected $table = 'contacts';
    protected $fillable = [
        'country',
        'address',
        'longitude',
        'latitude',
        'emails',
        'created_at',
        'updated_at'
    ];

    public function getAllContacts(){
        return $this->get()->toArray();
    }

    public function createContact($data){
        return $this->create($data);
    }

    public function updateContact($data){
        return $this->find($data['id'])->update($data);
    }

    public function getContactById($id){
        return $this->find($id);
    }

    public function deleteContactById($id) {
        return $this->find($id)->delete();
    }
}
