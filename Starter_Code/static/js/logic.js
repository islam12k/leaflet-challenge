let myMap = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 11
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


  let url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


  d3.json(url).then((data)=>{

    var address;
    
    earth_data=data.features;
    for(i=0;i<earth_data.length;i++){
        let location=earth_data[i].geometry;
        let r=earth_data[i].properties.mag
        let opa=location.coordinates[2]
        address=earth_data[i].properties.place
        
        let color_depth;

        if(opa<10){

            color_depth='#A1E8A1';
           

        }
        else if(10<=opa<=30){
            color_depth='#7CDF7C';
            
            

        }

        else if (30<opa<=50){
            color_depth='#57D657';
     
            
        }

        else if(50<opa<=70){
            color_depth='#32CD32';

            
        }
        else if(70<opa<=90){
            color_depth='#29A829';

            
        }
        else {
            color_depth='#175E17';

            
        }
        
        var markers=L.circle([location.coordinates[1],location.coordinates[0]],{
            color:color_depth,
            fillColor:color_depth,
            fillOpacity: 1,
            radius:r*10000
        }).bindPopup(`<h1>${address}</h1>`).addTo(myMap);
        
        
        

    }
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function(map) {
          var div = L.DomUtil.create('div', 'info legend');
          let grades = ['-10-10','10-30','30-50','50-70','70-90','90+'];
          var color=['#A1E8A1','#7CDF7C','#57D657','#32CD32','#29A829','#175E17'];
          let labels = [];
          var from;

        for (var i = 0; i < grades.length; i++) {
          from = grades[i];
          labels.push('<i style="background:' + color[i] + '">Lgn</i> ' +
            from)
        }
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(myMap);









   
   
  
});

 
