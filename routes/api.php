<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//API Users (пока не трогаю)
Route::post('login-verification', 'UsersController@loginVerification');

//API technologies
Route::post('save-technology','TechnologiesController@saveTechnology')
    ->middleware('cors');
Route::post('delete-technology','TechnologiesController@deleteTechnology')
    ->middleware('cors');

//API contacts
Route::post('save-contact','ContactsController@saveContact')
    ->middleware('cors');
Route::post('delete-contact','ContactsController@deleteContact')
    ->middleware('cors');

//API about
Route::post('save-about','AboutController@saveAbout')
    ->middleware('cors');

//API team
Route::post('save-employee','TeamController@saveEmployee')
    ->middleware('cors');