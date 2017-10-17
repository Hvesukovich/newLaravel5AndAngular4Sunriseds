<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $table = 'about';
    protected $fillable = [
        'title',
        'description',
        'text',
        'images',
        'created_at',
        'updated_at'
    ];

    public function getAbout(){
        return $this->get()->toArray();
    }

    public function createAbout($data){
        return $this->create($data);
    }

    public function updateAbout($data){
        return $this->find($data['id'])->update($data);
    }

    public function getAboutById($id){
        return $this->find($id);
    }


}
