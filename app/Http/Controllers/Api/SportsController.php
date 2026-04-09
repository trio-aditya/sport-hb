<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\SportsServices;

class SportsController extends Controller
{
    protected $sports;

    public function __construct(SportsServices $sports)
    {
        $this->sports = $sports;
    }

    //Menampilkan data liga
    public function leagues()
    {
        return response()->json($this->sports->getLeagues());
    }

    //Menampilkan data tim
    public function teams($league)
    {
        return response()->json($this->sports->getTeams($league));
    }

    //Menampilkan data pertandingan
    public function matches($id)
    {
        return response()->json($this->sports->getMatches($id));
    }
}
