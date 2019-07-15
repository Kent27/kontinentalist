<?php

/**
 * Custom error response
 */
function errorResponse($code, $message, $httpCode, $detail=null)
{
    if($detail){
        return response()->json([
            'code'=> $code,
            'message'=> $message,
                'detail'=>$detail
        ], $httpCode);
    }
    else{
        return response()->json([
            'code'=> $code,
            'message'=> $message
        ], $httpCode);
    }   
}

?>
