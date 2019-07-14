<?php

namespace App\Http\Controllers\API;

use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth; 
use GuzzleHttp\Client;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string'  
        ]);
        if ($validator->fails()) {
            return response()->json([                               
                'message'=> 'Input validation error',
                'errors' => $validator->errors()
            ], 400);
        }    

        $http = new \GuzzleHttp\Client(['http_errors' => false]);
       
        $response = $http->post('web/oauth/token', [
            'form_params' => [
                'grant_type' => 'password',
                'client_id' => env('PASSPORT_CLIENT_ID'),
                'client_secret' => env('PASSPORT_CLIENT_SECRET'),
                'username' => $request->email,
                'password' => $request->password,
                'scope' => '',
            ],
        ]);
      
        return json_decode((string) $response->getBody(), true);      
    }

}
