
  
function GetChangedUriInfo() {
        var uri = new URI();
        var mString = uri.directory();
        mString = mString.replace("home/index", "");
        mString = mString.replace("home/search", "");
        return mString;
    }
