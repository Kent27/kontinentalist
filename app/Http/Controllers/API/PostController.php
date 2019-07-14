<?php

namespace App\Http\Controllers\API;

use Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all();

        return response()->json([                               
            'result'=> $posts,
            'total' => $posts->count()
        ]);  
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {            
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|unique:posts|max:255',
            'content' => 'required|string'  
        ]);
        if ($validator->fails()) {
            return response()->json([                               
                'message'=> 'Input validation error',
                'errors' => $validator->errors()
            ], 400);
        }    

        $authedUserId = 1;
        $data = $request->only(['title', 'content']);
        $data['user_id'] = $authedUserId; 
        $post = Post::create($data);

        return $post;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::find($id);
        if(!$post){
            return response()->json([                               
                'message'=> 'Post not found'               
            ], 400);
        }

        return $post;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required_without_all:content|string|unique:posts|max:255',         
            'content' => 'required_without_all:title|string'  
        ]);
        if ($validator->fails()) {
            return response()->json([                               
                'message'=> 'Input validation error',
                'errors' => $validator->errors()
            ], 400);
        }    

        $post = Post::find($id);
        if(!$post){
            return response()->json([                               
                'message'=> 'Post not found'               
            ], 400);
        }

        $data = $request->only(['title', 'content']);   
        $post->fill($data);
        $post->save();

        return $post;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        if(!$post){
            return response()->json([                               
                'message'=> 'Post not found'               
            ], 400);
        }

        $post->delete();
        
        return response()->json([                                         
            'message' => 'Post is deleted successfully'
        ]);  
    }
}
