<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


//API technologies
Route::get('get-all-technologies', 'TechnologiesController@getAllTechnologies');
//API contacts
Route::get('get-all-contacts', 'ContactsController@getAllContacts')
    ->middleware('cors');
//API about
Route::get('get-about', 'AboutController@getAbout')
    ->middleware('cors');
//API team
Route::get('get-team', 'TeamController@getTeam')
    ->middleware('cors');