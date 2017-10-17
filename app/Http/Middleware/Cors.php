<?php // /app/Http/Middleware/Cors.php
namespace App\Http\Middleware;

use Closure;

class Cors
{
    public function handle($request, Closure $next)
    {
//        return $next($request)
//            ->header('Access-Control-Allow-Origin', '*')
//            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');


//        var_dump($request->header());
//dd('222222');
        /* @var Illuminate\Http\JsonResponse $response */
        $response = $next($request)
            ->header('Access-Control-Allow-Origin' , '*')
//            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With');
//            ->header('Access-Control-Max-Age', '28800');

//        var_dump($response->headers->all());
//        var_dump(headers_list());
//        var_dump(get_class($response));
        return $response;

//        return $next($request)
//            ->header('Access-Control-Allow-Origin', '*')
//            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
//            ->header('Access-Control-Allow-Credentials', 'true')
//            ->header(
//                'Access-Control-Allow-Headers',
//                'Authorization, Origin, X-Requested-With, Accept, X-PINGOTHER, Content-Type'
//            );
    }
}