<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Technologies extends Model
{
    protected $table = 'technologies';
    protected $fillable = [
        'name',
        'ico',
        'color',
        'img',
        'ico_or_img',
        'display',
        'created_at',
        'updated_at'
    ];

    public function getAllTechnologies(){
        return $this->get()->toArray();
    }

    public function createTechnology($data){
        return $this->create($data);
    }

    public function saveTechnology($data){
        return $this->find($data['id'])->update($data);
    }

    public function technologyById($id){
        return $this->find($id);
    }

    public function deleteTechnologyById($id) {
        return $this->find($id)->delete();
    }

}
