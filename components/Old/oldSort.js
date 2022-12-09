  var dataSource = dishesData
    if(search && (!isEmpty(filterTags) && filterTags !== null)){
      setFilteredData(dataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const textData = search.toUpperCase();
        if(WHAFilter){
          return (item.dishName?.toUpperCase().indexOf(textData) > -1 || item.restaurant?.toUpperCase().indexOf(textData) > -1) && item.tags?.some(r=> filterTags.indexOf(r) >= 0) 
          && item.wouldHaveAgain;
        }else{
          return (item.dishName?.toUpperCase().indexOf(textData) > -1 || item.restaurant?.toUpperCase().indexOf(textData) > -1) && item.tags?.some(r=> filterTags.indexOf(r) >= 0);
        }
        
      }))
    }
    else if (search){
      setFilteredData(dataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const textData = search.toUpperCase();
        if(WHAFilter){
          return (item.dishName?.toUpperCase().indexOf(textData) > -1 || item.restaurant?.toUpperCase().indexOf(textData) > -1) 
          && item.wouldHaveAgain;
        }else{
          return (item.dishName?.toUpperCase().indexOf(textData) > -1 || item.restaurant?.toUpperCase().indexOf(textData) > -1);
        }
      }))
    }
    else if ((!isEmpty(filterTags) && filterTags !== null)){
        setFilteredData(dataSource.filter(function (item) {
          if(WHAFilter){
            return item.tags?.some(r=> filterTags.indexOf(r) >= 0) && item.wouldHaveAgain;
          }else{
            return item.tags?.some(r=> filterTags.indexOf(r) >= 0);
          }
        }))
    }
    else if (!isEmpty(dishesData)){
      if (WHAFilter){
        setFilteredData(dataSource.filter(function (item) {
          return item.wouldHaveAgain
        }))
      }else{
        setFilteredData(dishesData)
      }
    }