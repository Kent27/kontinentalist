<?php

namespace App\Http\Controllers\API;

use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth; 
use GuzzleHttp\Client;
use App\User;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string'  
        ]);
        if ($validator->fails()) {
            return errorResponse(100, 'Input validation error', 400, $validator->errors());                   
        }    

        $user = User::where('email', $request->email)->first();

        $http = new \GuzzleHttp\Client(['http_errors' => false]);
       
        $response = $http->post('web/oauth/token', [
            'form_params' => [
                'grant_type' => 'password',
                'client_id' => env('PASSPORT_CLIENT_ID'),
                'client_secret' => env('PASSPORT_CLIENT_SECRET'),
                'username' => $request->email,
                'password' => $request->password,
                'scope' => $user && $user->role==='Admin'?'users-manage-all':'users-manage-self',
            ],
        ]);

        if($response->getStatusCode() != 200){
            return errorResponse(50, json_decode((string) $response->getBody())->message, $response->getStatusCode());           
        }

        return json_decode((string) $response->getBody(), true);      
    }

}
