
  
function GetChangedUriInfo() {
        var uri = new URI();
        var mString = uri.directory();
        var mString = (mString.split("home", 2))[0];
        if (mString.slice(-1) != "/")
            mString += "/";

        return mString;
    }
