var app=angular.module('starter', ['ionic','angularModalService']);

app.run(function($rootScope){
  $rootScope.accesstoken="CAAG36gDjUaIBAOv2NMFvHh8ZBtsaQeaD7BSuDpbvcJtrHJvGQUK5ILcu9k8EJZBq6UZBMAEiYB0cDCducjUg27KaXLnZAd00Dr0B0n2H6pAHaCDs6BH5hq8hUw8W7vPtbGeCNSiaNrZCOrhGkNuTrASTcoS8PtoRFPnSpd3Ha440Bvbr07AUU";

});

app.factory('pullFb', function($http,$rootScope,$stateParams,$ionicLoading,$sce) {
  $rootScope.brand=$stateParams.id;
	var url= "https://graph.facebook.com/v2.3/";
  var token="access_token="+$rootScope.accesstoken;
  var query="";
  var photos=[];

	return {
    analytics:function(e){
        ga('send','event','dev',e,$rootScope.brand);
        console.log("ga:"+e+", "+$rootScope.brand);
    },
		getPosts: function(){
      //console.log("getPosts:"+$rootScope.brand);
      query="/?fields=posts.fields(name,link,source,description,place,created_time,message,likes.limit(1).summary(true),comments.limit(1).summary(true),shares,picture)&";
      var link=url+$rootScope.brand+query+token;
      console.log(link);
			$http.get(link).then(function(response){
        myData=response.data.posts.data;
        //console.log("============================ POSTS ============================ ");
        console.log(myData);
       $rootScope.items = myData;
        $ionicLoading.hide();
       return $rootScope.items;
			});
		},
    getAbout: function(){
      query="/?fields=id,name,description,about,likes,website,phone,location,picture,link,cover&";
      var link=url+$rootScope.brand+query+token;
      console.log(link);
			$http.get(link).then(function(response){
				data = response.data;
        //console.log("============================ ABOUT ============================ ");
        //console.log(data);
        $rootScope.about=data;
          //$ionicLoading.hide();
        return $rootScope.about;
			});
		},
    getBrands: function(query){
      console.log("query here");
      console.log(query);
      var url="https://graph.facebook.com/v2.5/search?access_token=CAAG36gDjUaIBAOv2NMFvHh8ZBtsaQeaD7BSuDpbvcJtrHJvGQUK5ILcu9k8EJZBq6UZBMAEiYB0cDCducjUg27KaXLnZAd00Dr0B0n2H6pAHaCDs6BH5hq8hUw8W7vPtbGeCNSiaNrZCOrhGkNuTrASTcoS8PtoRFPnSpd3Ha440Bvbr07AUU&type=page&q="+query+"&fields=id,name,category,description,about,likes,website,phone,emails,location,link,cover&limit=9999"
      console.log(url);
      $http.get(url).then(function(response){
				data = response.data.data;
        console.log("============================ BRANDS ============================ ");
        console.log(data);
        $rootScope.brands=data;
        $ionicLoading.hide();
        return $rootScope.brands;
			});
		},
    getBrandfromLocation: function(lat,long,q){
      console.log("==query here===");
      var qi=q;
      console.log(qi);
      console.log(long);
      console.log(lat);
      var url="https://graph.facebook.com/v2.5/search?access_token=CAAG36gDjUaIBAOv2NMFvHh8ZBtsaQeaD7BSuDpbvcJtrHJvGQUK5ILcu9k8EJZBq6UZBMAEiYB0cDCducjUg27KaXLnZAd00Dr0B0n2H6pAHaCDs6BH5hq8hUw8W7vPtbGeCNSiaNrZCOrhGkNuTrASTcoS8PtoRFPnSpd3Ha440Bvbr07AUU&type=page&q="+qi+"&center="+lat+","+long+"&distance=9000"+"&fields=id,name,category,description,about,likes,website,phone,emails,location,link,cover&limit=9999"
      console.log(url);
      $http.get(url).then(function(response){
				data = response.data.data;
        console.log("============================ BRANDS ============================ ");
        console.log(data);
        $rootScope.brands=data;
        $ionicLoading.hide();
        return $rootScope.brands;
			});
		},
    getEvents: function(){
      var backupevents=[
        {
           "id": "784871421633561",
           "name": "Wings for Life World Run 2016 - Great Britain",
           "description": "The Wings for Life World Run is back for a third time on Sunday, May 8, 2016.\n\nTaking place all over the world - you can take part in this unique global race in the UK running for those who can't. \n\nOur mission: Spinal cord injury must become curable and we need you again - with 100 per cent of your entry fee going towards are mission to achieve this.\n\nRegister now: http://win.gs/1ETRGqN\nEvent info: http://www.wingsforlifeworldrun.com/gb/en/",
           "cover": {
              "offset_x": 0,
              "offset_y": 50,
              "source": "https://fbcdn-photos-e-a.akamaihd.net/hphotos-ak-xaf1/t31.0-0/p480x480/11182647_691561817638630_4031910682768720367_o.jpg",
              "id": "691561817638630"
           },
           "location": "United Kingdom",
           "start_time": "2016-05-08",
           "ticket_uri": "http://www.wingsforlifeworldrun.com/gb/en/"
        },
        {
           "id": "1176041279079942",
           "name": " Dune Dusters 2015",
           "description": "A running challenge up and over some of the biggest sand dunes in Australia. This is NOT a beach run!  Dune Dusters will set out an approximately 10km course that will challenge runners to race up and over some of the largest sand dunes on the iconic Stockton Beach.\n\nThe race will take place at the Southern End of Stockton Beach. As parking and access is limited to the area we will run shuttle buses from the registration area at Murrook Centre to the start.\nTo get to the Murrook Centre:\nMurrook Culture Centre\n2163 Nelson Bay Rd\nWilliamtown\nNew South Wales\n2318\nHeading towards Nelson Bay it is located 2.4km from Newcastle Airport turn off or if you are driving from Nelson Bay we are 31 kilometers from Victoria Parade.\nGoogle Maps Link: http://bit.ly/1sFOrKc\n\n\nEntries close 5pm Friday 27th November 2015 if places not filled prior.\nCompetitors must be over the age of 16 on the day of the event. Those under 18 must have the waiver signed by a legal guardian.\nEntry Fee\n$30\nCost is per entrant and includes GST.\nEnter at: www.bigrunevents.com.au/redbulldunedusters\n\nCompetitor\u2019s entry fee includes:\n\u2022 Race number with timing chip\n\u2022 Transport to and from the start/finish area from Murrook Centre\n\u2022 Water and  on course and post-race recovery area\n\u2022  Dune Dusters branded buff",
           "cover": {
              "offset_x": 0,
              "offset_y": 63,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xap1/v/l/t1.0-9/s720x720/12108926_775999209194890_8533598861063838128_n.jpg?oh=46f00c3d76457ed57ea093002e7cfeaf&oe=568F9F70",
              "id": "775999209194890"
           },
           "location": "Stockton Beach, Newcastle",
           "start_time": "2015-11-29T08:30:00+1100",
           "end_time": "2015-11-29T13:00:00+1100",
           "ticket_uri": "http://redbull.com.au/dunedusters"
        },
        {
           "id": "819890858078192",
           "name": " Billy Cart",
           "description": " Billy Cart is an event in which amateur drivers and their fearless team of three build and race homemade billy cart vehicles. Each handmade machine is fuelled by nothing but sheer courage, the force of gravity and perhaps a little . This unique, non-motorised racing event challenges both experienced racers and amateurs alike to design and build outrageous billy cart dream machines and compete against the clock in a downhill race.\n\t\n has held more than forty billy cart races (often referred to as  Soapbox in other countries) around the world since the first one in Brussels in the year 2000 \u2013 from Australia to South Africa, Helsinki to St. Louis, Jamaica to Italy. Over the years, vehicles have ranged from realistic replicas to anything the imagination can conjure up. Previous designs have included a piano, a giant baby carriage, a rodeo clown, a massive corn on the cob, a jail cell and the Golden Gate Bridge.\n\n\n Billy Cart will take place in Sydney in November 2015.\n\nClick 'going' to be updated as we release more details!",
           "cover": {
              "offset_x": 0,
              "offset_y": 0,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/s720x720/11266532_10155579845420352_3840421226780319908_n.png?oh=b3601c6eb72140abcf429fbbbe69ba7d&oe=56BAB72D",
              "id": "10155579845420352"
           },
           "location": "Australia ",
           "start_time": "2015-11-15T07:00:00+0800",
           "ticket_uri": "http://redbullbillycart.com.au/"
        },
        {
           "id": "823093814474561",
           "name": "Social Innovation Festival",
           "description": "Come and experience a living exhibition of innovative ideas and social projects that are helping to uplift our communities. \n\nYou are invited to join this celebration of entrepreneurial spirit and creative expression as some of Langa\u2019s streets are transformed into a car-free space for an afternoon.\n\nFor more information:\nhttp://openstreets.co.za/events/social-innovation-festival\n\n#itsyourspace\n\nwww.openstreets.org.za\nhttps://amaphiko.redbull.com",
           "cover": {
              "offset_x": 0,
              "offset_y": 51,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xfp1/t31.0-8/s720x720/12052394_1607104129530870_7988368395900799516_o.jpg",
              "id": "1607104129530870"
           },
           "location": "Washington Street Langa",
           "start_time": "2015-11-08T12:00:00+0200",
           "end_time": "2015-11-08T17:00:00+0200"
        },
        {
           "id": "187101904956902",
           "name": " Music Academy Presents Three Years Of Analog Room",
           "description": " Music Academy proudly presents 3 years of Analog Room with Juan Atkins. The pioneer and architect of Detroit techno takes the decks at Q Underground in the Holiday Inn Al Barsha. Not only will Juan Atkins be celebrating his thirty-fifth year in music creation and inspiration, but he will be coming to celebrate the third anniversary of the city\u2019s cornerstone in underground electronic music, Analog Room.",
           "cover": {
              "offset_x": 0,
              "offset_y": 50,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xap1/l/t31.0-8/s720x720/12109836_775592372568907_7143766913240748243_o.jpg",
              "id": "775592372568907"
           },
           "location": "Holiday Inn - Al Barsha, Dubai",
           "start_time": "2015-11-05T22:00:00+0400",
           "end_time": "2015-11-06T03:00:00+0400"
        },
        {
           "id": "1504302879889714",
           "name": " Robin Hood 2015",
           "description": "** Registration opens at 12pm on Friday 25th September **\n\nThe popular race will return on 1st November 2015 in Robin Hood\u2019s home county of Nottinghamshire, providing runners with a unique event that requires a combination of speed, stamina and navigational skill.\n\nCompetitors will need to find their way around the carefully mapped out course in Sherwood Pines forest, while completing a range of special tasks and activities that have been cranked up a notch since its introduction last year.\n\nTo make the event even more accessible to those without orienteering racing experience, a new category has been opened up for teams of three \u2013 allowing entrants to enjoy the race with their friends and family.\n\nA link for registration will be posted here on Friday morning. There are limited places, so be quick to ensure you don't miss out.\n\nRead more about the event at www.redbull.com/robinhood",
           "cover": {
              "offset_x": 0,
              "offset_y": 38,
              "source": "https://fbcdn-sphotos-e-a.akamaihd.net/hphotos-ak-xtp1/t31.0-8/s720x720/12039058_766382136823264_4732904778201534460_o.jpg",
              "id": "766382136823264"
           },
           "location": "Sherwood Pines",
           "start_time": "2015-11-01T10:00:00+0000"
        },
        {
           "id": "332279520309896",
           "name": " BC One Latin America Final & Livestream",
           "description": "Fecha: 30 de octubre de 2015\nLugar: Coliseo Miguel Grau del Callao\nHora: 8:00pm - ENTRADA LIBRE\n\nEl viernes 30 de octubre, en el Coliseo Miguel Grau del Callao, se llevar\u00e1 a cabo la final latinoamericana de la competencia m\u00e1s grande y prestigiosa de B-Boys en el mundo  BC One, en la que los 16 mejores breakers del continente competir\u00e1n en batallas uno contra uno, por un cupo en la Final Mundial en Italia.\n\nSer\u00e1n dos representantes de la casa y competir\u00e1n contra B-Boys de Chile, Colombia, M\u00e9xico, Argentina, Cuba, Bolivia, Brasil, Costa Rica, Rep\u00fablica Dominicana y Venezuela.\n\nEse d\u00eda, cada B-Boy deber\u00e1 mostrar sus mejores pasos, ritmo \u00fanico y creatividad en cada movimiento para impresionar al exigente jurado internacional, conformado por: Roxrite, Pelezinho y Lilou. Por su parte, DJ Prax, har\u00e1 que los m\u00e1s de 3,000 asistentes disfruten cada batalla como en ning\u00fan otro lugar. \n\nPodr\u00e1s ver todo lo que pasa en este evento en vivo por streaming:  www.redbullbcone.com\n\n*\u00danete a la conversaci\u00f3n: \u0040redbullperu \u0040redbullbcone #BCone\n\n*\u00danete a la p\u00e1gina de Facebook para informarte de todas las novedades:  Bc One Final Latinoamericana",
           "cover": {
              "offset_x": 0,
              "offset_y": 0,
              "source": "https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-xtp1/v/t1.0-9/s720x720/12112090_771571762970968_721545872944310461_n.jpg?oh=6d00e543d6ba2fdab67a09be8bdb2791&oe=568C58A2&__gda__=1456095307_25dc0f72974648bae7cad7b50262a867",
              "id": "771571762970968"
           },
           "location": "Lima, Peru",
           "start_time": "2015-10-30"
        },
        {
           "id": "916655231736009",
           "name": " Music Academy Presents: United States of Bass",
           "description": " Music Academy United States of Bass will take Miami by storm with a celebration of the history of Bass music this October. Expect heavy bass, 808 beats, breakneck bombs and one nation under\u2026BASS.\n\nFriday, Oct. 23, 2pm - 11:30pm\nRBMA RADIO: MARATHON OF BASS MUSIC\nTune in to www.rbmaradio.com for a 12-hour bass music marathon featuring Laz, Luke and more. \n\nSaturday, Oct. 24, 10pm-3am \u0040 Gramps Wynwood\nUNITED STATES OF BASS: MIAMI\n\nLINEUP:\nUncle Luke\nDJ CRAZE\nEgyptian Lover\nDJ LAZ (The Real DJ LAZ)\nDJ Assault\nDj Sliink\nDJ Spinn & DJ EARL\nSnappy Jit\nTT THE ARTIST\nwith Special Guests\n\n\u2022 21+. FREE WITH RSVP: win.gs/usofbass\n\u2022 CAPACITY IS LIMITED & RSVP DOES NOT GUARANTEE ENTRY; PLEASE ARRIVE EARLY.\n\nJoin the conversation: \u0040RBMA #UnitedStatesofBass",
           "cover": {
              "offset_x": 0,
              "offset_y": 0,
              "source": "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xtf1/v/t1.0-9/s720x720/12011318_10206877225796618_4522889225587348857_n.jpg?oh=6994ad4eeea0ace631be4ffcd500d71a&oe=56CB3C71&__gda__=1452220809_3f17926c10070639ded9612c3f97f9ce",
              "id": "10206877225796618"
           },
           "location": "Gramps",
           "start_time": "2015-10-24T22:00:00-0400",
           "end_time": "2015-10-25T03:00:00-0400",
           "ticket_uri": "http://win.gs/usofbass"
        },
        {
           "id": "434061860120004",
           "name": " R\u00e6vejagt",
           "description": "J\u00e6geren bliver den jagede den 24. oktober n\u00e5r  R\u00e6vejagt afholdes for f\u00f8rste gang nogensinde p\u00e5 dansk jord. Det kuperede og unikke terr\u00e6n omkring Rebild Bakker i Rold skov danner rammerne for jagten. Tilmeldingen er lukket.\n\n#REDBULLR\u00c6VEJAGT\n\nProgram:\n\nFredag den 23. oktober\n13:30 - 18:00: Check in og udlevering af racebags\n14:00 - 18:00: Ruten er \u00e5ben for tr\u00e6ning med tidtagning\n\nL\u00f8rdag den 24. oktober\n08:00 - 14:00: Cykelservice\n09:30 - 12:00: Check in og udlevering af racebags\n10:00 - 12:00: Ruten er \u00e5ben for tr\u00e6ning med tidtagning\n13:00 - 13:30: Afgang til startomr\u00e5det\n14:00 - 15:30: RACE\n15:30 - 19:00: After race arrangement:\n\nFind alt deltagerinformation her: http://win.gs/1Xhcb8k",
           "cover": {
              "offset_x": 0,
              "offset_y": 0,
              "source": "https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xpl1/v/t1.0-9/s720x720/11954737_748076898653788_1641128475753043903_n.jpg?oh=e6ba5ba7cbed4384ac292f6981b0866e&oe=56BE03F1&__gda__=1451977432_7cbba82a587e0813f57f376b74260b86",
              "id": "748076898653788"
           },
           "location": "Rebild Bakker i Rold Skov",
           "start_time": "2015-10-24T14:00:00+0200"
        },
        {
           "id": "593586267409411",
           "name": " Soapbox Race Atlanta",
           "description": " Soapbox Race is returning to Atlanta! \n\n Soapbox Race is a national event for amateur drivers racing homemade soapbox vehicles. Each hand-made machine is fueled by creativity and competitive fun. This unique non-motorized racing event challenges both experienced and amateur racers to design and build outrageous, human-powered soapbox dream machines and compete against the clock in a downhill race.\n\nWHEN: Saturday, October, 24, 2015\n             Race starts at 12p ET ; Pits open at 11a ET\nWHERE: North Avenue NE and Glen Iris Dr NE, Atlanta, Georgia \n\nCAN I COMPETE?\nApplications are officially closed. Best of luck to the participating teams! You can check their team bios out here: http://win.gs/soapboxatl  \nSee everyone October 24 on North Avenue! \n\n*Event is FREE and OPEN to the public!\n*Hit us up with questions with #SoapboxATL\n*For more info, visit: http://win.gs/soapboxatl",
           "cover": {
              "offset_x": 0,
              "offset_y": 52,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xap1/t31.0-8/s720x720/10947400_640044946123651_4688394195879070589_o.jpg",
              "id": "640044946123651"
           },
           "location": "North Avenue NE, Atlanta, GA 30308",
           "start_time": "2015-10-24T11:00:00-0400",
           "ticket_uri": "http://win.gs/soapboxatl"
        },
        {
           "id": "1678220789076588",
           "name": " Reign: Final | Melbourne",
           "description": "Open to Australia\u2019s elite ballers,  Reign is set apart from other competitive formats through the unique test of a team\u2019s endurance, skill, teamwork and ability to own the court. In standard 3-on-3 tournaments, winning teams normally play four to five games by the end of the day; however, in  Reign, the winning team will have played a total of 13 games, making it an incredible show of talent, technique and longevity, as the competition seeks out Australia\u2019s best basketball stars.\n\nRegistrations for  Reign are now open, and the competition\u2019s official ambassador Lanard Copeland is putting the call out for Australia\u2019s elite to sign up. \u201cIt\u2019s great to be involved in  Reign,\u201d said Copeland. \u201cBasketball is such a popular sport internationally, and it\u2019s events like these that will put Australia on the map; so if you\u2019ve got the skills, get online and register now.\u201d\n\nThe winning Melbourne team receives a $6,000 cash prize and Rebel Sports prize pack valued at $2,000\n\nTo register an elite team or to find out more visit www.redbull.com.au/reign\n\nEvent Schedule:\nQualifier #1, Perth (McCallum Park Basketball Courts) \u2013 10th October\nQualifier #2, Sydney (Entertainment Quarter) \u2013 17th October\nQualifier #3/National Final, Melbourne  (Docklands) - 24th October",
           "cover": {
              "offset_x": 67,
              "offset_y": 0,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xlp1/v/t1.0-9/s720x720/11988500_749329435195201_3582822601865471985_n.jpg?oh=e56cebab0548a267e1c84e528083d422&oe=56C0E06D",
              "id": "749329435195201"
           },
           "location": "Docklands, 80 Harbour Esplanade, Docklands",
           "start_time": "2015-10-24T10:00:00+1100",
           "end_time": "2015-10-24T19:00:00+1100"
        },
        {
           "id": "1662950063988442",
           "name": " Music Academy Presents Departure Lounge",
           "description": "Thursday 22nd October \u0040 The Arch Gallery, Hackney\n\nOnra B2B Illum Sphere\nJeremy Underground B2B Alexander Nut\nKrystal Klear B2B Kool Clap\n\nFREE ENTRY - first come, first served\n\nThe annual  Music Academy kicks off in Paris this October and with anticipation reaching fever pitch the UK will bid adieu to their homegrown participants at  Music Academy presents Departure Lounge on 22nd October at The Arch Gallery in East London.\n\nIn a one off cultural exchange featuring French and UK DJs playing back-to-back, Hoya:Hoya don and 2010  Music Academy alumni Illum Sphere joins Class of 2008 beatmaker Onra, Eglo Records head honcho Alexander Nut teams up with Parisian selector extraordinaire Jeremy Underground, and Cold Tonic boss Krystal Klear joins forces with fellow alumni and funk wizard Kool Clap, in an event that will fuse sounds from both sides of the Channel.\n\nWith its unique billing, Departure Lounge acts as a fond farewell, designed to excite and inspire UK Academy participants Corey K, Emma-Jean Thackray, and Hyroglifics for their onward journey to the  Music Academy in Paris. \n\nThere they will join 58 other specially selected producers, vocalists, beat-makers, instrumentalists and DJs from over 36 different countries to learn from a team of world class studio mentors including; Modeselektor, Thundercat, Dorian Concept and Just Blaze. \n\nNow in its 17th year, the  Music Academy runs from 25th October to 27th November, and will be based at La Ga\u00eet\u00e9 lyrique in Paris\u2019 3rd Arrondissement. \n\nAcross the five weeks the Academy will host a cutting-edge programme of music events, workshops, public lectures and art exhibitions with contributions from the likes of Laurent Garnier, Jean-Michel Jarre, Hudson Mohawke, Nicolas Godin (Air), Floating Points and John Talabot b2b Roman Fl\u00fcgel to name but a few.  \n\nTickets and full event info for the RBMA Paris events are now available at redbullmusicacademy.com/paris.",
           "cover": {
              "offset_x": 0,
              "offset_y": 50,
              "source": "https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xtp1/t31.0-8/s720x720/12080164_771791962948948_5679694659519316096_o.jpg",
              "id": "771791962948948"
           },
           "location": "The Arch Gallery",
           "start_time": "2015-10-22T20:00:00+0100",
           "end_time": "2015-10-23T00:00:00+0100"
        },
        {
           "id": "874952165874243",
           "name": " Foiling Generation France",
           "cover": {
              "offset_x": 0,
              "offset_y": 0,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/s720x720/12039728_396760557186815_8030645894735631903_n.jpg?oh=88e5404afd28a867c9f4007eaa2c522d&oe=5691BEA7",
              "id": "396760557186815"
           },
           "location": "La Baule",
           "start_time": "2015-10-19T09:00:00+0200",
           "end_time": "2015-10-21T21:00:00+0200",
           "ticket_uri": "http://www.redbull.fr/foilinggeneration"
        },
        {
           "id": "384073708468720",
           "name": " Campus Cricket World Finals 2015",
           "description": "The  Campus Cricket is the ultimate show-down between eight college teams, from India, Pakistan, Sri Lanka, Bangladesh, England, South Africa, Australia and UAE. They will compete for the top honours at National School of Cricket Dehradun this year!  \n\nEach of them is a champion of their respective national tournaments, but have one last mountain to climb. \n\nThe tournament returns to the sub-continent, and it will be a boost for the sub-continental teams even as competitors from South Africa, England and Australia will have some catching up to do. Last season, Assupol TUKS (South Africa) were crowned champions in the chilly English summer.\n\nSo, who will take the crown this time, as the cricketing autumn sets on the Indian sub-continent? We'll know soon as the World Finals kick off on the 19th of October! \n\nAbout:\n Campus Cricket is a one of its kind T20 tournament that allows aspiring youngsters to showcase their cricket skills on a global stage. It is an annual event that brings together the best players, and teams, from among universities across the world. It is an international platform that allows them to take the first step towards achieving their dream of playing professional cricket.\n\nWhere: National School of Cricket, Dehradun\nWhen: 19-24 October \n\nFollow all the action on Twitter at \u0040RBCampusCricket and join in using #CampusCricket",
           "cover": {
              "offset_x": 50,
              "offset_y": 0,
              "source": "https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/s720x720/12079326_771871189607692_7923475565462512273_n.jpg?oh=188b0cce91433eba6cf69ab6f424e6c7&oe=56909EB8&__gda__=1456683934_57584e44ec75499e0e2285fe200c68ab",
              "id": "771871189607692"
           },
           "location": "Abhimanyu Cricket Academy, Dehradun",
           "start_time": "2015-10-19T10:00:00+0530",
           "end_time": "2015-10-24T22:00:00+0530"
        },
        {
           "id": "732539353480797",
           "name": " Air Race Las Vegas",
           "description": "It's non-stop action as the World Championship heads to Sin City.\nGlitz and glamour is the only way in Las Vegas, which is situated in southern Nevada and is one of the fastest growing areas in the USA. The world-famous Las Vegas strip has become a global icon, helping the city to build its reputation as the entertainment capital of the world.",
           "cover": {
              "offset_x": 0,
              "offset_y": 0,
              "source": "https://scontent.xx.fbcdn.net/hphotos-frc3/t31.0-8/s720x720/10479892_10152947953819882_3437019617596867356_o.jpg",
              "id": "10152947953819882"
           },
           "location": "Las Vegas Motor Speedway",
           "start_time": "2015-10-17T10:00:00-0700",
           "end_time": "2015-10-18T18:00:00-0700"
        },
        {
           "id": "874260585962810",
           "name": " Reign: | Sydney",
           "description": "Open to Australia\u2019s and NSW's elite ballers,  Reign is set apart from other competitive formats through the unique test of a team\u2019s endurance, skill, teamwork and ability to own the court. In standard 3-on-3 tournaments, winning teams normally play four to five games by the end of the day; however, in  Reign, the winning team will have played a total of 13 games, making it an incredible show of talent, technique and longevity, as the competition seeks out Australia\u2019s best basketball stars.\n\nRegistrations for  Reign are now open, and the competition\u2019s official ambassador Lanard Copeland is putting the call out for Australia\u2019s elite to sign up. \u201cIt\u2019s great to be involved in  Reign,\u201d said Copeland. \u201cBasketball is such a popular sport internationally, and it\u2019s events like these that will put Australia on the map; so if you\u2019ve got the skills, get online and register now.\u201d\n\nThe winning Sydney team receives a $2000 cash prize, a $1000 Rebel Sports pack and a trip to play in the  Reign National Finals in Melbourne on October 24th, where they have the chance to compete for the an additional total purse valued at $10,000.\n\nTo register an elite team or to find out more visit www.redbull.com.au/reign\n\nEvent Schedule:\nQualifier #1, Perth (McCallum Park Basketball Courts) \u2013 10th October\nQualifier #2, Sydney (Entertainment Quarter) \u2013 17th October\nQualifier #3/National Final, Melbourne  (Docklands) - 24th October",
           "cover": {
              "offset_x": 67,
              "offset_y": 0,
              "source": "https://fbcdn-sphotos-d-a.akamaihd.net/hphotos-ak-xpt1/v/t1.0-9/s720x720/11987016_749329018528576_5585718990892738358_n.jpg?oh=50de2233e7e448aeef06b096038e9eff&oe=56C7F53A&__gda__=1456431900_418de1fb905136b1d99115d66965fbca",
              "id": "749329018528576"
           },
           "location": "Entertainment Quarter Moore Park",
           "start_time": "2015-10-17T10:00:00+1100",
           "end_time": "2015-10-17T19:00:00+1100"
        },
        {
           "id": "1397250957266914",
           "name": " Flying Bach Houston",
           "description": "In the ultimate clash of cultures,  Flying Bach fuses the explosive style of the innovative breakdance crew Flying Steps with the music of Johann Sebastian Bach. The result is a live performance that shatters barriers and merges artistic realms.\n\n*Join the conversation: \u0040redbullHOU #FlyingBach\n*For more information, visit: http://win.gs/bachhou",
           "cover": {
              "offset_x": 0,
              "offset_y": 63,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xtp1/t31.0-8/s720x720/12119912_776254472502697_5254767107392803900_o.jpg",
              "id": "776254472502697"
           },
           "location": "Wortham Theater Center",
           "start_time": "2015-10-13T18:00:00-0500",
           "end_time": "2015-10-18T23:00:00-0500"
        },
        {
           "id": "510588969099353",
           "name": " Reign: Campus Champs | Adelaide",
           "description": "Campus Champs teams are locked in and the countdown is on!\n \n Reign is a basketball event where teams will compete in the ultimate 3-on-3 battle, testing a team's endurance, skill and ability to navigate a half court under lights to score!\n \nWhere: Aquinas College- 1 Palmer Pl, North Adelaide SA 5006\nWhen: October 13 (Tuesday)\n Time: Games commence at 4pm sharp\nBring: (players) Basketball attire,  jersey supplied and you\u2019re A Game\n \nPlayers get there at least 1 hour early to fill out paperwork, receive uniform & warm up!\n \nFor last minute requests/ questions please contact patrick.hamden\u0040redbulluni.com.au\n \nSpectators and supporters are encouraged! Get down and support your university street ball team and see who will be crowed South Australia\u2019s Campus Champs!\n \nSee you there!\n \n \n-The  Team-",
           "cover": {
              "offset_x": 0,
              "offset_y": 0,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/s720x720/11924918_749327375195407_7464819540370645708_n.jpg?oh=899343b7f9f757088e2e021aa7ca2591&oe=56914D9A",
              "id": "749327375195407"
           },
           "location": "Aquinas College- 1 Palmer Pl, North Adelaide SA 5006",
           "start_time": "2015-10-13T16:00:00+1030",
           "end_time": "2015-10-13T19:00:00+1030"
        },
        {
           "id": "528292457345841",
           "name": "Grassroots Tour",
           "description": "Dialling contest runs and chasing points all year long can get a bit taxing. Sometimes you have to take it back to the core - just cruise with your mates, have a few laughs, walk inside a massive dam wall, go shark cage diving, that sort of thing...\n\nThat's exactly what Moses Adams, Allan Adams, TJ Rogers and Mikey Mendoza are planning to do after KDC. Via Bloem, the Gariep Dam to PE and on to the Eden that is Mossel Bay and George. A week or so in an RV and they'll be down in the Mother City.\n\nFollow the tour here: http://win.gs/1jK4FEC\n\nKimberly Diamond Cup\n7th - 10th October\n\n#GrassrootsTour stops:\nBloemfontein\nGariep Dam\nPort Elizabeth\nMossel Bay\nGeorge\nCape Town",
           "cover": {
              "offset_x": 0,
              "offset_y": 0,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xta1/t31.0-8/s720x720/12113450_774592862668858_3072405910506030033_o.jpg",
              "id": "774592862668858"
           },
           "location": "South Africa",
           "start_time": "2015-10-12T14:00:00+0200",
           "end_time": "2015-10-18T17:00:00+0200"
        },
        {
           "id": "529311773884368",
           "name": " Straight Rhythm 2015",
           "description": "After a highly successful inaugural event in 2014,  Straight Rhythm will return for a second consecutive year. The 2015 event will take place on October 10 and will once again be held at Fairplex in Pomona. An evolution of the sport of supercross, the event features head-to-head racing on an \u201cunwound\" track, where there are no turns, just a 1/2 mile-long straight rhythm section. Gates open at 11 a.m. Racing starts at 1 p.m.\n\nThe list of invited riders now includes James Stewart, Ryan Dungey, Cole Seely, Blake Baggett, Jason Anderson, Broc Tickle, Andrew Short, Weston Peick, Ken Roczen, Davi Millsaps, Kyle Chisholm, Justin Barcia, Nick Wey, Jake Weimer, Justin Brayton, Phil Nicoletti, and Malcolm Stewart.\n\nStay tuned for more news updates as the event approaches.",
           "cover": {
              "offset_x": 0,
              "offset_y": 43,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xtf1/t31.0-8/s720x720/11951599_10156031215880352_7472457747134499650_o.jpg",
              "id": "10156031215880352"
           },
           "location": "Fairplex",
           "start_time": "2015-10-10T11:00:00-0700"
        },
        {
           "id": "655495034586701",
           "name": " Anadolu Break",
           "description": "www.redbull.com/anadolubreak\n\nAnadolu danslar\u0131 breakdans ile bulu\u015fuyor!\n\nSoka\u011f\u0131n ruhundan do\u011fan breakdans ile topra\u011f\u0131n g\u00fcc\u00fcn\u00fc yans\u0131tan Anadolu danslar\u0131,  #AnadoluBreak dans g\u00f6sterisi ile ayn\u0131 sahnede bulu\u015fuyor. Pr\u00f6miyerini 9 Ekim\u2019de, \u0130stanbul Zorlu Performans Sanatlar\u0131 Merkezi\u2019nde yapt\u0131ktan sonra 4 \u015fehri kapsayan Anadolu turnesine \u00e7\u0131kacak projenin sanat y\u00f6netmenli\u011fini \u00fcnl\u00fc dans toplulu\u011fu Flying Steps\u2019in kurucusu ve koreograf Kadir Memi\u015f (Amigo) \u00fcstleniyor. \n------------------------------------",
           "cover": {
              "offset_x": 67,
              "offset_y": 0,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xtp1/v/t1.0-9/s720x720/11800503_736639926464152_9157356407258082487_n.jpg?oh=a73660947bff19f2538b504712079ebd&oe=56897A25",
              "id": "736639926464152"
           },
           "start_time": "2015-10-10T15:00:00+0300",
           "end_time": "2015-11-24T21:00:00+0200",
           "ticket_uri": "http://www.biletix.com/etkinlik-grup/105644047/TURKIYE/tr"
        },
        {
           "id": "537382376414008",
           "name": " Car Park Drift - Oman Qualifier 2015",
           "description": "Oman is gearing up for the  Car Park Drift local qualifier for the sixth year on Friday October 9th 2015. \n\nThere will be several extraordinary rounds of exhilarating shows to crown the King of Drift and Oman\u2019s representative in the Finals. \n\nPreliminary rounds will take place the previous day on October 8th 2015 to select the best drifters. \n\nRegistration is open until 2pm on October 7th 2015.\nGrand stand tickets 1 OMR \nPremium Area tickets: 5 OMR\n\nFor more info visit: redbull.com/cpd\n\nThis event is in partnership with Ford Middle East, Shop and Ship, Oman Automobile Association, Oman Ministry of Tourism , Hi Fm Muscat, Hala FM and See Muscat",
           "cover": {
              "offset_x": 67,
              "offset_y": 0,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/s720x720/12096183_770410146420463_8369513588088072149_n.jpg?oh=9b3f5890a06b82e6389fa6c4e84d40d6&oe=56D01154",
              "id": "770410146420463"
           },
           "location": "Oman Automobile Association, Seeb",
           "start_time": "2015-10-09T18:00:00+0400"
        },
        {
           "id": "1655520784668460",
           "name": " Open Water Party",
           "description": "Today the first ever ' Open Water Party' in the region... Known for their ground breaking musical gatherings across the planet  are brining the regions finest Hollaphonic to perform in Barasti Beach Bar - Dubai Bay to a sea of thousands both on water and on land, on yachts and colourful inflatables. \n\nThis special event will see the Middle East's No.1 selling electronic act 'Hollaphonic' create waves alongside Barasti's finest as they headline from a purpose built catamaran sound system in the clear blue Dubai waters. Premiering their new single 'Turn The Lights Down' ft. Stephon LaMar the duo are fresh off the boat from the UK having had support from BBC Radio 1, Capital (radio network) and Kiss FM (UK) and featured No.3 in the world on Shazam's trending chart with 'Dangerous ft. Vince Kidd' - We cannot wait to see you in the sea!!",
           "cover": {
              "offset_x": 0,
              "offset_y": 0,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xaf1/t31.0-8/s720x720/12006573_769519433176201_5503498210663294692_o.jpg",
              "id": "769519433176201"
           },
           "location": "Barasti Beach Bar - Dubai",
           "start_time": "2015-10-09T14:00:00+0400",
           "end_time": "2015-10-09T19:00:00+0400"
        },
        {
           "id": "583866328417713",
           "name": "#BMXplore Manila with Viki Gomez and Matthias Dandois",
           "description": "Something of nothing \u2013 BMX flatland is part hip-hop dance, part gymnastic-like circus act, a little bit of stunt and a whole lot of the best bike handling you\u2019re ever likely to see. \n\nAs part of their #BMXplore tour, two of the world\u2019s finest flatlanders, Viki G\u00f3mez and Matthias Dandois are coming to The Philippines. They\u2019ll be showing-off their rampless skills all across Metro Manila from September 30th until October 5th.\n\n:::Schedule:::\n\nOctober 8th (Cebu)\n- 4pm | 7-Eleven Philippines | Escario \n- 8pm | M\u00f6venpick Hotel Mactan Island Cebu\n- 11pm | The Distillery Cebu\n- Midnight | J. Ave Superclub",
           "cover": {
              "offset_x": 0,
              "offset_y": 35,
              "source": "https://fbcdn-photos-g-a.akamaihd.net/hphotos-ak-xpa1/t31.0-0/p480x480/12113338_769900063138138_4647052080210476492_o.jpg",
              "id": "769900063138138"
           },
           "location": "J. Ave Superclub",
           "start_time": "2015-10-08T23:50:00+0800",
           "end_time": "2015-10-09T01:00:00+0800"
        },
        {
           "id": "1077566422255315",
           "name": " Race the Place",
           "description": "Last year, cyclists descended on Toronto\u2019s iconic Ontario Place for a two-wheeled thrill ride through the abandoned amusement park marking the first time anyone had accessed the grounds since the doors were shut in 2011.\n\nWell, we\u2019re unlocking the gates once again with the return of  Race the Place this fall on October 3rd in Toronto.\n\nRegister here: http://redbull.ca/racetheplace\n\nIt\u2019s only fitting to bring the event back to the city who\u2019s roots run deep in the urban cycling movement to host a race that will challenge riders, ranging from street-hardened couriers to weekend warriors in both fixed gear and open gear categories, to an all-out battle royale.\n\nBe warned, this is not the kind of amusement ride you remember as a kid; it\u2019s a speed-soaked chase through the island\u2019s industrial jungle full of hairpin turns, pedal heavy straightaways and other surprises along the way. Skill and experience on a bike is suggested, so leave the training wheels at home.",
           "cover": {
              "offset_x": 7,
              "offset_y": 0,
              "source": "https://scontent.xx.fbcdn.net/hphotos-xfp1/t31.0-8/q82/s720x720/11896387_742632002531611_3114297029164929148_o.jpg",
              "id": "742632002531611"
           },
           "location": "Ontario Place",
           "start_time": "2015-10-03T08:00:00-0400",
           "end_time": "2015-10-03T17:30:00-0400"
        }
      ];
      query="/?fields=events.fields(id,name,description,cover,location,start_time,end_time,ticket_uri)&";
      var link=url+$rootScope.brand+query+token;
        console.log(link);
      $http.get(url+$rootScope.brand+"/?fields=events.fields(id,name,description,cover,location,start_time,end_time,ticket_uri)&"+token).then(function(response){
        if(response.data.events==undefined){
          $rootScope.events=backupevents;
        }else{
        data = response.data.events.data;
        $rootScope.events=data;
          $ionicLoading.hide();
        }
        return $rootScope.events;
      });
    },
    getVideos: function(){
      var backupvideo=[
              {
              id: "10154170146603306",
              description: "Guess which MediaCorp celebrity we surprised this time round with his customised can of Coke? Want your own personalised #ShareACokeSG can? Come join us at our roadshows now and see here for location details: http://www.coca-cola.com.sg/SHAREACOKESG",
              updated_time: "2015-05-20T13:26:14+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xat1/v/t15.0-10/p160x160/11331491_10154170146898306_495107571_n.jpg?oh=93f785daa14dcac5579da007b0979f0a&oe=56BBD4BB&__gda__=1455190858_fe06cbbf79c929e1776f9e259b731525",
              source: "https://fbcdn-creative-a.akamaihd.net/hads-ak-xpt1/v/t43.1792-4/11125771_643147962454114_1910311244_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0%3D&oh=db3bff05aed50efe3decbd785ccfa208&oe=562CAE52&__gda__=1445741796_2204b6df39f8e5b9daf7a648ece594d0",
              length: 15
              },
              {
              id: "10154149920868306",
              description: "What present do you get a birthday boy who has everything? A #ShareaCokeSG can with his name on it of course! Happy belated #3zero @RomeoTan! Wish someone a birthday or just a token of appreciation by getting a customised #Coke can at our roadshows now! Location details: http://www.coca-cola.com.sg/SHAREACOKESG/",
              updated_time: "2015-05-13T05:30:01+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xtp1/v/t15.0-10/p160x160/11188757_10154149921533306_758686422_n.jpg?oh=b894a9448a2610945034ecab4b3deda5&oe=56B97AAC&__gda__=1456183890_c03563f1b7b2b7aa2e8b96a62265f076",
              source: "https://fbcdn-creative-a.akamaihd.net/hads-ak-xpa1/v/t43.1792-4/11146866_10154149921403306_761350870_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0%3D&oh=11066e7de77cb4cfd526cb6164062e3a&oe=562C7C4B&__gda__=1445768323_b18ceb831fa589f01c4b65c8b65fa437",
              length: 15
              },
              {
              id: "10154137620928306",
              description: "It's ambush time! We sprung a #ShareaCokeSG surprise onto @FeliciaChin and boy, aren't we glad we planned it just right! smile emoticon. Get your customised #ShareaCokeSG can printed on the spot at our roadshows. More locations here: http://www.coca-cola.com.sg/SHAREACOKESG/",
              updated_time: "2015-05-06T19:20:50+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xta1/v/t15.0-10/p160x160/11085983_10154137621328306_35719305_n.jpg?oh=0c09e912203b36c643fe1cf391bb0b99&oe=56D24E76&__gda__=1451878265_504c565228cb258e1f62e02ebde8df93",
              source: "https://scontent.xx.fbcdn.net/hads-xfa1/v/l/t43.1792-4/11138219_10154137621153306_385231845_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0%3D&oh=c0d5549304767fad9465632efe9fda8a&oe=562C8748",
              length: 15
              },
              {
              id: "10154119003808306",
              description: "Our fan @serenachenyi shared this amazing #ShareaCokeSG video with us with inspiration from the jungle! Circle of Life by @serenachenyi, @wahpiangeh, @yeoclarence and @kexintay. Lyrics by #ShareACokeSG #UncleHonAhboyMaKorkorAuntie #whatwedowhengigsendearly Get your own personalised cans at the #ShareaCokeSG roadshows here: http://www.coca-cola.com.sg/SHAREACOKESG/",
              updated_time: "2015-04-28T03:30:01+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xaf1/v/t15.0-10/p160x160/11114713_10154119004848306_1368176561_n.jpg?oh=172dd48602ade46c3da6f95d5a08ea0a&oe=56C891EE&__gda__=1451778472_cead0363a7fc4a9e1cd45e971f286789",
              source: "https://fbcdn-creative-a.akamaihd.net/hads-ak-xap1/v/t43.1792-4/11142845_10154119004668306_26450752_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0%3D&oh=f0d1c0e8196716d92ef90b7811c35ab5&oe=562CBF9B&__gda__=1445764888_3f1b7293d4f7814e9f6be364b1d9e2c0",
              length: 15.081
              },
              {
              id: "10154111945793306",
              description: "Share a Coke with Singapore and open connections. We see our neighbours every day. But how many of them do we know? Share a Coke and open connections today! #ShareaCokeSG http://www.coca-cola.com.sg/SHAREACOKESG/",
              updated_time: "2015-04-25T03:00:02+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xft1/v/t15.0-10/p128x128/11085968_10154111958908306_1730563033_n.jpg?oh=305dd2f1e4e25e612e852c57b3d9eb80&oe=56D35F41&__gda__=1455342149_b8129054523091e189645407c5a1638a",
              source: "https://fbcdn-creative-a.akamaihd.net/hads-ak-xta1/v/t43.1792-4/11178975_10154111958678306_1835615238_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0%3D&oh=611a3b8ace2441173754597f3b94f195&oe=562C7AD0&__gda__=1445771789_78848c53e846e5cd33d6ac53f047e2fd",
              length: 45
              },
              {
              id: "10154105800173306",
              description: "Happy #EarthDay! Did you know that Coke bottles can have a second life? It’s never too late to start recycling.",
              updated_time: "2015-04-22T22:31:51+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xaf1/v/t15.0-10/p160x160/11114822_10154105800458306_257318241_n.jpg?oh=240e36c0ffc6d19ae3910116c289fb8f&oe=568A7775&__gda__=1454937636_60aeb4ba69337b802b48661dce15e259",
              source: "https://fbcdn-video-e-a.akamaihd.net/hvideo-ak-xat1/v/t43.1792-2/11184189_10154105800323306_875471945_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=287&oh=9dcd1442d5de5ffc3af759ba4b7eca62&oe=562C75E4&__gda__=1445692452_28c90246c563a621b78bfa7c2976b7d3",
              length: 15.048
              },
              {
              id: "10154094215798306",
              description: "Everyone’s a happy camper with an ice-cold Coca-Cola to cool you down on a hot day! #sharehappiness",
              updated_time: "2015-04-19T05:00:01+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xta1/v/t15.0-10/p160x160/11114459_10154094216033306_509621126_n.jpg?oh=fa34df9896886c6e26387816fa0f474c&oe=56883A59&__gda__=1454984300_baf442287426c3bc0b81384c92360a69",
              source: "https://fbcdn-video-l-a.akamaihd.net/hvideo-ak-xpf1/v/t42.1790-2/11052115_10154094216328306_157287339_n.mp4?efg=eyJybHIiOjYxMCwicmxhIjo1MTIsInZlbmNvZGVfdGFnIjoidjFfNDAwX2NyZl8yN19tYWluXzMuMF9zZCJ9&rl=610&vabr=339&oh=b77c52b7762eb447609cc7075c41d869&oe=562B8816&__gda__=1445741794_739b8e220c5edbf7875575a22ac30a09",
              length: 1.198
              },
              {
              id: "10154094212283306",
              description: "Holding out an ice-cold Coca-Cola is like giving a high-five! TAG a friend to wish them a Happy #HighFive Day!",
              updated_time: "2015-04-17T14:59:36+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xft1/v/t15.0-10/p160x160/11114868_10154094212703306_1689477326_n.jpg?oh=be0846c732dc1d1468e63734d3f2b6e7&oe=5686F96B&__gda__=1456269167_6711fb309bfb0831ed44d42a4d489be2",
              source: "https://fbcdn-video-o-a.akamaihd.net/hvideo-ak-xap1/v/t42.1790-2/10976012_10154094212928306_1603897887_n.mp4?efg=eyJybHIiOjMwMCwicmxhIjo1MTIsInZlbmNvZGVfdGFnIjoidjFfNDAwX2NyZl8yN19tYWluXzMuMF9zZCJ9&rl=300&vabr=22&oh=7e16860b3e3b0927c93cf4258464373b&oe=562C9604&__gda__=1445740991_d7df20f478e199c67ebfc415f60f3a28",
              length: 6.7
              },
              {
              id: "10154094138533306",
              description: "Which filter looks best on #CocaCola? You guessed right! #EveryFilter! What are your go-to filters?",
              updated_time: "2015-04-17T14:27:01+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xpa1/v/t15.0-10/p160x160/11048870_10154094139523306_163503364_n.jpg?oh=e08799c70b46f0f4a85581c9607478c8&oe=56BF44C8&__gda__=1455945664_ca3c7f4deb6618a076304a5120ff990d",
              source: "https://video.xx.fbcdn.net/hvideo-xfp1/v/t43.1792-2/11055019_10154094139348306_844421160_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=459&oh=47fb5ad2500dd7f4ad12b9e56b13b81e&oe=562CAAA0",
              length: 10.71
              },
              {
              id: "10154047417438306",
              description: "Join us for the ultimate Movement is Happiness event! Be there at the Coca-Cola Retro Zone @TheMusicRun on 11 April 2015! Remember, the more you move, the happier you feel! #movementishappiness",
              updated_time: "2015-03-29T02:29:15+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xpf1/v/t15.0-10/p128x128/11085961_10154047419623306_1564295010_n.jpg?oh=d1b889ff2060b3583a211aa487d7a798&oe=56C66D40&__gda__=1451829395_07c055f2234038fa57f218552e75ca36",
              source: "https://video.xx.fbcdn.net/hvideo-xpf1/v/t43.1792-2/11067363_10154032250743306_100679623_n.mp4?efg=eyJybHIiOjMyMjksInJsYSI6NDA5NiwidmVuY29kZV90YWciOiJoZCJ9&rl=3229&vabr=2153&oh=5fa72c9747a6c305be611f0419525d56&oe=562C9896",
              length: 105
              },
              {
              id: "10154001858223306",
              description: "SHARE to spread #openhappiness with your friends!",
              updated_time: "2015-03-18T04:00:01+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xpa1/v/t15.0-10/p160x160/10963473_10154001858878306_1230617922_n.jpg?oh=b3e53878787c329dd8c99126171b4976&oe=56B7CAD0&__gda__=1451921439_60ddf2ea26d6fbfb2e7fae5f5513eb0d",
              source: "https://video.xx.fbcdn.net/hvideo-xap1/v/t43.1792-2/1970382_10154001858653306_780853605_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=231&oh=04ec7e984d99dceb451849f1ea923273&oe=562B75D4",
              length: 8.875
              },
              {
              id: "10154001855543306",
              description: "Celebrate the ultimate refreshment of Coca-Cola and ice! Happy Friday everyone :)",
              updated_time: "2015-03-13T04:00:02+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xaf1/v/t15.0-10/p160x160/10963489_10154001856738306_1216801272_n.jpg?oh=80d2cd1c7662410f0ce71a500913dee1&oe=56CFFB02&__gda__=1455064132_9eee06bbfd2c39ddb9ebe5c4d02a268d",
              source: "https://fbcdn-video-d-a.akamaihd.net/hvideo-ak-xfa1/v/t43.1792-2/11052697_10154001856538306_770560171_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=205&oh=d4ee57cedf02e8e1ae7ab1fd63afef7d&oe=562C55C6&__gda__=1445739192_1d6afcd858e487ea04e9e1496fb155c8",
              length: 15.015
              },
              {
              id: "10153934638458306",
              description: "Let your days be smooth and! bright with Coca-Cola! Xiang Yun wishes to #sharehappiness an! d greetings of prosperity to all families!",
              updated_time: "2015-06-19T23:14:46+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xpt1/v/t15.0-10/p128x128/10963539_10153934682348306_10153934638458306_212_1207_b.jpg?oh=5003f955cd81aa3283503bb0ca44df38&oe=56CE8D77&__gda__=1456644909_330560741936afc4b20f82f1c95efa02",
              source: "https://video.xx.fbcdn.net/hvideo-xfa1/v/t43.1792-2/10952712_10153934682218306_1881683398_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=480&oh=fc698246f89c6f2fec95d1619c18b5bb&oe=562C43D3",
              length: 20
              },
              {
              id: "10153934578778306",
              description: "This Chinese New Year, take the time to #sharehappiness with your loved ones. Romeo Tan and Coca-Cola wishes everyone a prosperous and happy life.",
              updated_time: "2015-02-14T16:00:04+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xtf1/v/t15.0-10/p128x128/10876259_10153934620238306_10153934578778306_41636_659_b.jpg?oh=7aa90715f0c6e14f5c7ebdba9646f113&oe=568A45D6&__gda__=1455392616_da6f2ed5d4f1e910777c889c337dbae5",
              source: "https://video.xx.fbcdn.net/hvideo-xaf1/v/t43.1792-2/10930241_10153934620118306_217130836_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=615&oh=78569624ffda04bccf1463129c4792ce&oe=562C8119",
              length: 20
              },
              {
              id: "10153934483658306",
              description: "This Chinese New Year, dedicate your special #CNY greetings to your loved ones with the auspicious Coca-Cola cans! Ya Hui and Coca-Cola wishes everyone a year filled with abundant happiness!",
              updated_time: "2015-02-10T16:00:02+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xpf1/v/t15.0-10/p128x128/10963723_10153934548098306_10153934483658306_29508_2347_b.jpg?oh=eb757508838f4e8436d772db2ad45649&oe=56C6AC48&__gda__=1451994362_48276dfb255901045ce6b4ca660ef13f",
              source: "https://fbcdn-video-j-a.akamaihd.net/hvideo-ak-xpf1/v/t43.1792-2/10894056_10153934547983306_1572715308_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=410&oh=ea79386072ea803bf71b83f4e4d20303&oe=562C70D1&__gda__=1445768812_3b5225fb536d0ae062ad36c3ff330c18",
              length: 20
              },
              {
              id: "10153934405228306",
              description: "Felicia Chin wishes all Coca-Cola fans and their families a wonderful Chinese New Year filled with prosperity and overflowing happiness! #Sharehappiness now!",
              updated_time: "2015-02-09T15:01:21+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xaf1/v/t15.0-10/p128x128/10955874_10153934457153306_10153934405228306_65068_755_b.jpg?oh=0c8bd7c6f6540325170e72a777cda7f8&oe=568B7BE8&__gda__=1456425939_66b1bc835a3febe7f843d3143b3d7592",
              source: "https://video.xx.fbcdn.net/hvideo-prn2/v/t43.1792-2/10857034_10153934457033306_1117732782_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=422&oh=8aa2909dcae6c97b903921d5910c92c3&oe=562C5803",
              length: 20
              },
              {
              id: "10153926105033306",
              name: "Sundays @ The Park",
              description: "When was the last time you had family picnic or played a game of hopscotch with your kids? Kick-start your week with Sundays @ The Park – a programme by the Health Promotion Board together with ActiveSG, NParks and Coca-Cola. Get moving with us! #movementishappiness More details at: www.cokeurl.com/sundays",
              updated_time: "2015-02-05T16:18:50+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xfa1/v/t15.0-10/p128x128/50700_10153926115073306_10153926105033306_1908_656_b.jpg?oh=d78ad2660ec752024fa0fd53f5d6bcc1&oe=568C3092&__gda__=1455900103_7e948fce3199c119afb0197ccee1ae7e",
              source: "https://fbcdn-video-b-a.akamaihd.net/hvideo-ak-xfa1/v/t43.1792-2/10322043_10153926114958306_1652363946_n.mp4?efg=eyJybHIiOjE1NjQsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1564&vabr=1043&oh=2b45d240e856ebe47fbcc4919bd80521&oe=562C577D&__gda__=1445693644_5693b3d1f638a94ef529ad76868d14d4",
              length: 29.96
              },
              {
              id: "10153883595263306",
              description: "Refresh and delight your family and friends as you wish them ‘Gong Xi Fa Cai’ with these limited edition Coca-Cola cans. Collect all 8 of the specially designed cans which bear lucky Chinese characters. Spread the good fortune when you #sharehappiness now!",
              updated_time: "2015-03-03T02:53:30+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xpf1/v/t15.0-10/p128x128/10840920_10153883652028306_10153883595263306_50396_2697_b.jpg?oh=b15a7e2c1a52a3667a6ac427ade2294e&oe=56D22029&__gda__=1451700379_d9973e6bb0182c3655ee6ab20af57c6c",
              source: "https://fbcdn-creative-a.akamaihd.net/hads-ak-xpa1/v/t43.1792-4/10248039_10153883651713306_360133649_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0%3D&oh=a00e77d706038aa512c004d47cf580c6&oe=562C3741&__gda__=1445749961_15bc3d1ca3bdefe2a5cbadec574c3d6f",
              length: 30
              },
              {
              id: "10153777156463306",
              description: "A magical winter wonderland arrives in sunny Singapore. Watch as Finland and Singapore #shareawhitechristmas at Raffles City Singapore!",
              updated_time: "2015-06-19T23:12:45+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xft1/v/t15.0-10/p128x128/10381712_10153777161993306_10153777156463306_38692_2033_b.jpg?oh=837c9d959bc00ca49d57b1805dbe4776&oe=56BE276E&__gda__=1456046435_83b3b110427f9de334fc93340bd65f0f",
              source: "https://fbcdn-creative-a.akamaihd.net/hads-ak-prn2/v/t43.1792-4/10827629_10153777161593306_614334869_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0%3D&oh=f5a29c65deb2a654be27b871ab921280&oe=562C9A62&__gda__=1445773498_1bb4e62c2131d148308f3571e332bd48",
              length: 103.8
              },
              {
              id: "10153743201698306",
              description: "Need an instant burst of refreshment? Check out this cool #minihappiness hack. 1 more week to participate in our simple and easy contest. Xbox Ones and GoPros to be won: www.cokeurl.com/minihappiness",
              updated_time: "2014-12-06T19:55:37+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xpa1/v/t15.0-10/p160x160/10821083_10153743202148306_10153743201698306_57812_818_b.jpg?oh=fdd5e3d348b3fbe3e9209a9cc23c5d43&oe=56C240B7&__gda__=1456426126_6335a94abc2d24fee9126ab913bf4949",
              source: "https://fbcdn-creative-a.akamaihd.net/hads-ak-xpf1/v/t43.1792-4/10444355_10153743202133306_160353674_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0%3D&oh=94d43dab553e3d080db3faed08bd2c8f&oe=562C7BAE&__gda__=1445751582_57181e2e0d21abae75cb414764a38733",
              length: 14
              },
              {
              id: "10153743193088306",
              description: "Fantasy or reality? Watch and decide..! . Last call to win Xbox Ones and GoPros in our #minihappiness contest: www.cokeurl.com/minihappiness",
              updated_time: "2014-12-08T01:00:01+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xpa1/v/t15.0-10/p160x160/10821056_10153743193608306_10153743193088306_12708_1251_b.jpg?oh=d5a2d4a799f4386c2ba689ec3bc9af8c&oe=56C1D4FD&__gda__=1456372579_46a419e025709dd3c04ccc7970b8d7f8",
              source: "https://fbcdn-creative-a.akamaihd.net/hads-ak-ash2/v/t43.1792-4/10804135_10153743193588306_1778399489_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0%3D&oh=68650edefd93c28718c0fab255356674&oe=562C86D9&__gda__=1445765141_d8f2d793586f10b9cd744113b9c011b9",
              length: 11.32
              },
              {
              id: "10153739348493306",
              description: "Happiness appears when you least expect it. More #minihappiness to be found with our Xbox One and GoPro contest giveaway: www.cokeurl.com/minihappiness",
              updated_time: "2014-12-03T16:38:54+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xaf1/v/t15.0-10/p160x160/10677643_10153739349103306_10153739348493306_54980_876_b.jpg?oh=f0dce5cb9711a3aadf1e451196eb262f&oe=56CA7DDA&__gda__=1452252641_fe23cbc15f81ddb32d55bddec9f24e49",
              source: "https://fbcdn-creative-a.akamaihd.net/hads-ak-frc3/v/t43.1792-4/10829855_10153739349078306_2132508812_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0%3D&oh=28f008d54661e68e2dab63a3b4e9bca4&oe=562C6D06&__gda__=1445764787_da0538eb07cc72ba3d5a95533a9e3c46",
              length: 9.56
              },
              {
              id: "10153734731723306",
              description: "Experience your next meal with a refreshing burst of local flavour. Coca-Cola with food. Better together.",
              updated_time: "2015-06-19T23:09:25+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xpa1/v/t15.0-10/p128x128/10821378_10153734732158306_10153734731723306_34700_1637_b.jpg?oh=ac620d409e6eac63806fe4059a23f558&oe=56C6AED2&__gda__=1455531852_0132de4904319058378d48c473f0020a",
              source: "https://fbcdn-creative-a.akamaihd.net/hads-ak-prn2/v/t43.1792-4/10804136_10153734732128306_1572353843_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0%3D&oh=484e25179df5582a61232c406358d3aa&oe=562C83F1&__gda__=1445693534_d8f1eba9dd3be46f7fd28cb2718f7571",
              length: 30.04
              },
              {
              id: "10153731031738306",
              description: "A mind-blowing way to share #minihappiness with your friends. Xbox Ones and GoPros also up for grabs: www.cokeurl.com/minihappiness",
              updated_time: "2014-11-29T20:23:21+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xfa1/v/t15.0-10/p160x160/1095214_10153731032983306_10153731031738306_20172_459_b.jpg?oh=c2277f74b3e7897cbbc471801a6d39c3&oe=568C29E5&__gda__=1451696403_1ddebfa911f3348a5a1c831ffec72944",
              source: "https://fbcdn-creative-a.akamaihd.net/hads-ak-xap1/v/t43.1792-4/10827486_10153731032973306_1905582918_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0%3D&oh=9ba795054e2a9a31b35212d4d1c6d223&oe=562CA11B&__gda__=1445745320_4b175737e7540d88f6c062b0e3f1cf04",
              length: 12.04
              },
              {
              id: "10153698778433306",
              description: "Can a video really show you what you'll experience when you take the stage with Avicii in Vegas? Not even close. But hey, it's still pretty awesome. #ShareTheSound And before you stand with Avicii on stage, stand with him now when you join us, along with @(RED), in the fight for an #AIDSFreeGen. Enter: http://bit.ly/Coke-Avicii",
              updated_time: "2015-06-19T23:09:05+0000",
              picture: "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xap1/v/t15.0-10/p128x128/1394748_10153698785658306_10153698778433306_52444_1004_b.jpg?oh=3266d88ca4f26412db337d67da7162c4&oe=56C6BD3E&__gda__=1455342305_04b7f6e2e69dafd7bbb3e61e11ec337d",
              source: "https://fbcdn-creative-a.akamaihd.net/hads-ak-xtp1/v/t43.1792-4/10480083_10153698785583306_311711172_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImxlZ2FjeV9oZCJ9&oh=588c9b246e67022e29b3a8a7490d87a1&oe=562CA634&__gda__=1445768796_1d93a9a9adf9edd29fc77cbc6c685adb",
              length: 73.019
              }
              ];
      query="?fields=videos.fields(id,name,description,updated_time,picture,source,length)&"
      var link=url+$rootScope.brand+query+token;
      console.log(link);
      $http.get(link).then(function(response){
        if(response.data.videos==undefined){
          $ionicLoading.hide();
          console.log("NO VIDEO FOUND");
          $rootScope.videos=backupvideo;

        }else{
        data=response.data.videos.data;
        console.log(data);
        $rootScope.videos=data;
          $ionicLoading.hide();
        }
        $rootScope.played=$sce.trustAsResourceUrl($rootScope.videos[0].source);
        console.log($rootScope.played);
        return $rootScope.videos;
      });
    },
		getPhotos: function(id){

      query="?fields=albums.fields(id,name,cover_photo,photos.fields(name,picture,source,place,name_tags,created_time))&";
    var link=url+$rootScope.brand+query+token;
      console.log(link);
      var link=url+$rootScope.brand;
        //console.log($rootScope.brand);
        var albums="";
        $rootScope.photos="";
      $http.get(url+$rootScope.brand+"?fields=albums.fields(id,name,cover_photo,photos.fields(name,picture,source,place,name_tags,created_time,likes.limit(1).summary(true),comments.limit(1).summary(true)))&"+token).then(function(response){
        var albums=response.data.albums.data;
        console.log(albums)
        for(var i=0;i<albums.length;i++){
          if(albums[i].photos==undefined||albums[i].photos.data==undefined ||albums[i].photos.data.length<1 ){continue;}
          for(var x=0;x<albums[i].photos.data.length;x++){
            photos.push(albums[i].photos.data[x]);
          }
        }
        $rootScope.photos=photos;
        $ionicLoading.hide();
        return $rootScope.photos;
      });
		}
	}
});

app.controller("product",function($scope,$rootScope,pullFb){

    $scope.title="Product";
    $scope.products=[
      {src:"http://images.techtimes.com/data/images/full/83650/amazon-echo.jpg?w=600",descr:"",title:"Amazon Echo",price:"$120.50"},
      {src:"http://im.ziffdavisinternational.com/t/pcmag_uk/news/3/39-amazon-fire-tv-stick-new-fitbit-trackers-legere/39-amazon-fire-tv-stick-new-fitbit-trackers-legere_tvyd.640.jpg",descr:"",title:"Amazon Fire Stick",price:"$38.00"},
      {src:"https://g.foolcdn.com/editorial/images/172346/amazon_large.jpg",descr:"",title:"PS4 Bundled Set",price:"$319.00"},
      {src:"http://cdn.ndtv.com/tech/gadgets/the_house_of_marley_amazon_ndtv.jpg",descr:"",title:"Tasmin Tube",price:"$140.00"},
      {src:"http://i.usatoday.net/tech/_photos/2011/12/28/USA-TODAYs-notable-tech-products-from-2011-62P6OCU-x-large.jpg",descr:"",title:"Iphone 4S",price:"$130.00"},
      {src:"http://www.kiplinger.com/slideshow/investing/T057-S003-14-tech-products-taking-a-bite-out-of-apple/images/google-nexus-series.jpg",descr:"",title:"Google Nexus",price:"$219.00"},
      {src:"http://www.lasplash.com/uploads/gift_guide/roundup_0000000000011143_image_01.jpg?v=1293152203",descr:"",title:"Ultrasone HFI-680",price:"$93.00"},
      {src:"http://www.outdoortechnology.com/core/media/media.nl/id.518000/c.1283311/.f?h=73234cbb6ff484518db0",descr:"",title:"Outdoor Tech Wireless Headphones",price:"$116.00"},
      {src:"http://hsto.org/getpro/habr/post_images/e40/c25/6a7/e40c256a72c6b0a9ed12bacfeef159a4.jpg",descr:"",title:"Neptune Pine",price:"$543.00"}
    ];
    pullFb.analytics("Shop");
});

app.controller("deals",function($scope,pullFb){

    $scope.title="Promotions";
    $scope.promotions=[
      {src:"http://cdn1.greatdeals.com.sg/wp-content/uploads/2013/12/zalora-revolution-day.png",descr:"Get 25% off our newest items with our promo code",title:"The Big Summer Promotion"},
      {src:"http://www.passionforsavings.com/wp-content/uploads/2011/09/1068.jpg",descr:"50% off Selected Items",title:"Mid-season sale"},
      {src:"http://couponicious.com.sg/wp-content/uploads/2013/09/9-2-2013-11-31-41-AM.jpg",descr:"Check out our new breakfast menu",title:"Live well eat well"},
      {src:"http://charlotterestauranttraffic-flywheel.netdna-ssl.com/wp-content/uploads/2015/10/ProjectPINK.jpg",descr:"Bring one person to get free Entry",title:"Celebrating New Years"},
    ];
    pullFb.analytics("Promotions");
});

app.controller("about",function($scope,$rootScope, pullFb){
    $scope.title="About us";
    $rootScope.about=pullFb.getAbout();
    pullFb.analytics("About");
});

app.controller("events",function($scope,$rootScope,pullFb,ModalService){
    $scope.title="Events";
    $rootScope.events=pullFb.getEvents();
      pullFb.analytics("Events");
    $scope.show = function(src) {
      $rootScope.src=src;
       ModalService.showModal({
           templateUrl: 'views/template.html',
           controller: "ModalController",
       });
   };
});

app.controller("videos",function($scope,$rootScope,pullFb,$sce, ModalService){
    $scope.title="Videos";
    $rootScope.videos=pullFb.getVideos();
      pullFb.analytics("Videos");
    $scope.show = function(src) {
      $rootScope.src=src;
      console.log(src);
       ModalService.showModal({
           templateUrl: 'views/template.html',
           controller: "ModalController",
       });
   };

});

app.controller('ModalController', function($scope, close,$rootScope,$sce,pullFb) {
$scope.play = $sce.trustAsResourceUrl($rootScope.src);
console.log($scope.play);
  pullFb.analytics("Openlink");
 $scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

 $scope.send=function(user,email,tel){
   pullFb.analytics("Successful:Contact");
   console.log($rootScope.brand);
   console.log(user + email+tel);
   //save it and put it up
   this.close('yes');

 }

});


app.controller("albums",function($scope,$rootScope,pullFb){
$rootScope.photos=pullFb.getPhotos();
    $scope.title="Photos";
    pullFb.analytics("Albums");
$scope.init = function(){
     $rootScope.photos=pullFb.getPhotos();
  }
});

app.controller("brands",function($scope,$rootScope,$http,pullFb){
    console.log("brands");
    $scope.init = function(){
      $scope.title="Brands";
    }
    $scope.send=function(b){
      var brand=b;
      var id=brand.id;
      var email=brand.emails[0];
      var name=brand.name;
      $http({
                  url: 'https://fan-server.herokuapp.com/send'+"?id="+id+"&email="+email+"&name="+name,
                  type: "GET",
                  success: function() { }
              });
    }
    $scope.search=function(query){
      $rootScope.brands=pullFb.getBrands(query);
      console.log($rootScope.brands);
    }
    $scope.address=function(add,query){
      var address=add;
      console.log("query:"+address);
      var url="http://maps.google.com/maps/api/geocode/json?address="+address+"&sensor=false";
      console.log(url);
      $http.get(url).then(function(response){
        var location=response.data.results[0].geometry.location;
        var lat=location.lat;
        var long=location.lng;
        pullFb.getBrandfromLocation(lat,long,query);
      });
      console.log($rootScope.brands);
    }
});

app.controller("help",function($scope,$rootScope,$ionicLoading,pullFb, ModalService){
    $scope.init = function(){
        $scope.title="Timeline";
        $rootScope.items=pullFb.getPosts();
        $ionicLoading.show({
          template: '<ion-spinner icon="spiral"></ion-spinner>',
        });

    };
    pullFb.analytics("Posts");
    $scope.clickSearch = function(){
        $scope.query = "";
    };

    $scope.show = function(src) {
      $rootScope.src=src;
      console.log(src);
       ModalService.showModal({
           templateUrl: 'views/template.html',
           controller: "ModalController",
       });
   };
});

app.controller("load",function($scope,$rootScope,$stateParams,$sce,pullFb, ModalService){
  var link="https://fb-fan.herokuapp.com/#/app/"+$stateParams.id;
  $scope.link = $sce.trustAsResourceUrl(link);
  $rootScope.about=pullFb.getAbout();
  pullFb.analytics("ViewDemo");

  $scope.signup=function(){
    pullFb.analytics("Attempt:Contact");
    ModalService.showModal({
        templateUrl: 'views/signup.html',
        controller: "ModalController",
    });
  }

});

app.controller('home', function($scope, $location, $anchorScroll) {
   $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   }
});

app.controller("menu",function($ionicLoading,pullFb,$rootScope){
  console.log("menu"),
  pullFb.getAbout();
});

app.filter('dateFormat', function($filter)
{

 return function(input)
 {
   console.log(input);
  if(input == null){ return ""; }
  var _date = $filter('date')(new Date(input), 'MMM dd yyyy');
  return _date.toUpperCase();
 };
});

  app.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app', {url: ':id',abstract: true,templateUrl: 'views/menu.html',controller:'menu'})
      .state('load',{url:'/demo/:id',templateUrl: 'views/load-brand.html',controller:'load'})
      .state('brands', {url:'/brands',templateUrl: 'views/brands.html',controller:'brands'})
      .state('app.help',{url:'/app/:id',views:{menuContent: {templateUrl: 'views/list.html',controller:'help'}}})
      .state('app.product', {url:'/app/:id/product',views: {menuContent: {templateUrl: 'views/product.html',controller:'product'}}})
      .state('app.deals', {url:'/app/:id/deals',views: {menuContent: {templateUrl: 'views/deals.html',controller:'deals'}}})
      .state('app.about', {url:'/app/:id/about',views: {menuContent: {templateUrl: 'views/about.html',controller:'about'}}})
      .state('app.albums', {url:'/app/:id/albums',views: {menuContent: {templateUrl: 'views/albums.html',controller:'albums'}}})
      .state('app.events', {url:'/app/:id/events',views: {menuContent: {templateUrl: 'views/events.html',controller:'events'}}})
      .state('app.videos', {url:'/app/:id/videos',views: {menuContent: {templateUrl: 'views/videos.html',controller:'videos'}}})
      .state('error',{url:'/error',templateUrl: 'views/error.html'})
      .state('home',{url:'/',templateUrl: 'views/home.html',controller:'home'})
      $urlRouterProvider.otherwise('/');
    });
