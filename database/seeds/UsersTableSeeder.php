<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userData = File::get("database/user.json");
        $data = json_decode($userData, true);
        foreach ($data as $obj) {
            App\User::create(array(             
              'role' => $obj['role'],
              'email' => $obj['email'],
              'password' => Hash::make($obj['password']),
              'name' => $obj['name']
            ));
        }
    }
}
