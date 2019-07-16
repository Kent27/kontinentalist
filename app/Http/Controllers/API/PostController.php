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
    public function index(Request $request)
    {
        $posts = null;       
        if ($request->user()->tokenCan('users-manage-all')) {
            $posts = Post::all();
        }else{
            $posts = $request->user()->posts()->get();
        }

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
            return errorResponse(100, 'Input validation error', 400, $validator->errors());          
        }    
      
        $authedUserId = $request->user()->id;
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
    public function show(Request $request, $id)
    {            
        $post = Post::find($id);        

        if(!$post){
            return errorResponse(101, 'Post not found', 404);           
        }
        if (!$request->user()->tokenCan('users-manage-all') && $post->user->id != $request->user()->id) {
            return errorResponse(62, 'Sorry, you are not authorized to access this post', 403);                 
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
        $post = Post::find($id);
        if(!$post){
            return errorResponse(101, 'Post not found', 404);              
        }
        if (!$request->user()->tokenCan('users-manage-all') && $post->user->id != $request->user()->id) {
            return errorResponse(62, 'Sorry, you are not authorized to access this post', 403);                         
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required_without_all:content|string|max:255|unique:posts,title,'.$post->id,         
            'content' => 'required_without_all:title|string'  
        ]);
        if ($validator->fails()) {
            return errorResponse(100, 'Input validation error', 400, $validator->errors());               
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
    public function destroy(Request $request, $id)
    {
        $post = Post::find($id);
        if(!$post){
            return errorResponse(101, 'Post not found', 404);        
        }
        if (!$request->user()->tokenCan('users-manage-all') && $post->user->id != $request->user()->id) {
            return errorResponse(62, 'Sorry, you are not authorized to access this post', 403);               
        }

        $post->delete();
        
        return response()->json([                                         
            'message' => 'Post is deleted successfully'
        ]);  
    }
}
