window.onload = () => {
  let center = {
    lat: undefined,
    lng: undefined,
  }
}

const madrid = {
  lat: 40.4167754,
  lng: -3.7037902,
}

const markers = []
const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 12,
  center: madrid,
})

function addMarker(prop) {
  let marker = new google.maps.Marker({
    position: prop.coordinates, // Passing the coordinates
    map: map,
    draggarble: false, // If set to true you can drag the marker
  })
  if (prop.iconImage) {
    marker.setIcon(prop.iconImage)
  }
  if (prop.content) {
    let information = new google.maps.InfoWindow({
      content: prop.content,
    })

    marker.addListener("click", function () {
      information.open(map, marker)
    })
  }
}
addMarker({
  coordinates: { lat: 40.46040225329595, lng: -3.68435964295683 },
  iconImage: "/images/various/map-pointer-icon.svg",
  content: '<a href="https://www.cuartodejuegos.es/" target="_blank">Cuarto de juegos</a>' +
  `<p class="has-text-black">Card games and much more. Check it.</p>` ,
}) 

addMarker({   
  coordinates: { lat: 40.47478850400294, lng: -3.7126248433154387 }, 
  iconImage: "/images/various/map-pointer-icon.svg",
  content: '<a href="https://www.kamikazefreakshop.es//" target="_blank">Kamikaze Freak Shop</a>' +
  `<p class="has-text-black">Tournaments every week!</p>` ,
})

addMarker({   
  coordinates: { lat: 40.430127960089614, lng: -3.6983471971226276 },  
  iconImage: "/images/various/map-pointer-icon.svg",
  content: '<a href="https://www.jupiterjuegos.com/pagina/jupiter-madrid" target="_blank"> Júpiter juegos</a>' +
  `<p class="has-text-black">Check our calendar of activities</p>` ,
})

addMarker({   
  coordinates: { lat: 40.43156829350425, lng: -3.705148733693864 },
  iconImage: "/images/various/map-pointer-icon.svg",
  content: '<a href="https://www.generacionx.es/" target="_blank"> Generación X</a>' +
  `<p class="has-text-black">Play, have fun, make friends</p>` ,
})

addMarker({   
  coordinates: { lat: 40.445044327141495, lng: -3.7127586341400614 },
  iconImage: "/images/various/map-pointer-icon.svg",
  content: '<a href="https://www.padis-store.com/es/" target="_blank"> Padis</a>' +
  `<p class="has-text-black">Come visit us. Play your favourite card games.</p>` ,
})

addMarker({   
  coordinates: { lat: 40.4347937348252, lng: -3.7121570775509825 },
  iconImage: "/images/various/map-pointer-icon.svg",
  content: '<a href="https://magicitaca.com/" target="_blank"> ITACA</a>' +
  `<p class="has-text-black">Cards, tournaments, friends... Have it all!</p>` ,
})

addMarker({   
  coordinates: { lat: 40.41693578953985, lng: -3.7095539038267926 },
  iconImage: "/images/various/map-pointer-icon.svg",  
  content: '<a href="https://www.mtgmetropolis.com/metropolistienda/index_tienda.asp" target="_blank"> Metropolis Center</a>' +
  `<p class="has-text-black">Come to participate in our epic tournaments!</p>` ,
})

addMarker({   
  coordinates: { lat: 40.40413231686745, lng: -3.7041210711679753 },
  iconImage: "/images/various/map-pointer-icon.svg",  
  content: '<a href="http://www.xn--elmono-araa-beb.com/web/" target="_blank"> El Mono-Araña</a>' +
  `<p class="has-text-black">Card games to play with friends</p>` ,
})

addMarker({   
  coordinates: { lat: 40.420360192404914, lng: -3.674751713536062 },
  iconImage: "/images/various/map-pointer-icon.svg",  
  content: '<a href="https://www.jdejuegos.es/" target="_blank"> J de Juegos</a>' +
  `<p class="has-text-black">Come and learn to play card games</p>` ,
})

addMarker({   
  coordinates: { lat: 40.42184512665791, lng: -3.7050328655286577 },
  iconImage: "/images/various/map-pointer-icon.svg",  
  content: '<a href="https://www.atlanticajuegos.com/es/" target="_blank"> Atlántica Juegos</a>' +
  `<p class="has-text-black">Comer and learn to play card games</p>` ,
})
