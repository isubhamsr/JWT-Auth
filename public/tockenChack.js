$( document ).ready(function() {
    console.log( "ready!" );
    console.log( "1st" );
    const isChack = localStorage.hasOwnProperty('token')
    if(isChack){
      window.location.replace("/main");
    }else{
      window.location.replace("/signin");
    }
});