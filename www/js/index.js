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
      var backupvideo=[ {
            "id": "10156183073450352",
            "description": "What happens in Vegas...",
            "updated_time": "2015-10-20T19:00:03+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xap1/v/t15.0-10/p128x128/12109465_10156183075055352_65681112_n.jpg?oh=8a44b8a0bcda4491f3cad10bda80c122&oe=56BA3494&__gda__=1455651715_eab0d30e90f266c1ebdbe456fe965ef7",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xpf1/v/t43.1792-4/873002_10156183074925352_847097193_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=52babe773da03bbbc661b704d27c5d25&oe=5629AAF1&__gda__=1445583950_8bb54b5081c305fd447f1a5fc9d7c18f",
            "length": 34.467
         },
         {
            "id": "10156182785330352",
            "description": "Sometimes it's okay, not to tidy your toys away.",
            "updated_time": "2015-10-21T08:00:03+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xtp1/v/t15.0-10/p128x128/12105351_10156182790720352_1274535311_n.jpg?oh=05189ff75dc38ce1590ca57002b6d523&oe=569009F9&__gda__=1455424764_ec41c457268de1210fc69aca15f58af8",
            "source": "https://fbcdn-video-c-a.akamaihd.net/hvideo-ak-xpf1/v/t43.1792-2/11946111_10156182790165352_2049925905_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=544&oh=ee5644bd7c72403127e5313947fff3a0&oe=5629AF5B&__gda__=1445572838_6b57a1cf8dd6515ae12cb9b45596c3bf",
            "length": 84.6
         },
         {
            "id": "10156182570880352",
            "description": "Born to be wild.",
            "updated_time": "2015-10-20T11:55:57+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xat1/v/t15.0-10/p128x128/12104396_10156182571805352_1466690173_n.jpg?oh=97a39e39432a7433db6c61334230442a&oe=56C1855B&__gda__=1451592277_8d47b856cbc23b85f6d4bff1380776f8",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xfa1/v/t43.1792-4/11983569_10156182571620352_1752220226_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=23d3f59372560390b6e033c55ade0469&oe=5628DCBF&__gda__=1445595846_69517aecdab61b00f6a33453b6a84803",
            "length": 23.08
         },
         {
            "id": "10156180456600352",
            "description": "Cracked screens and rally machines.",
            "updated_time": "2015-10-19T18:56:04+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xap1/v/t15.0-10/p128x128/12105416_10156180461940352_341946661_n.jpg?oh=ebce30e6c587f460b9a95469963f1163&oe=56CC73A8&__gda__=1455682562_07c5f198f83a156dc98b2b777468814d",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xpa1/v/t43.1792-4/12136180_10156180461550352_1298704806_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=b492847458f32e1820a1742916b1157c&oe=562A161B&__gda__=1445518456_d2f7055f39c3d9897c4de41742a45c9d",
            "length": 50.533
         },
         {
            "id": "10156179513975352",
            "description": "Checkmate.",
            "updated_time": "2015-10-19T15:38:08+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xta1/v/t15.0-10/p128x128/12105519_10156179535510352_1948732211_n.jpg?oh=35e2adf852e25f87a706e81936497141&oe=56CE377B&__gda__=1456232983_7029647b5252d8b9087171d3b2dd46f1",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xpf1/v/t43.1792-4/12001293_10156179514210352_1361661358_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=76123471f3a3bf6c38ed29329751496f&oe=5629BEC9&__gda__=1445581756_3713a95ca3fe4b2253779d89f673cf93",
            "length": 13.16
         },
         {
            "id": "10156176467095352",
            "description": "Here's a glimpse of Singapore's representative B-boy Sean rocking the  BC One stage in Seoul last night!",
            "updated_time": "2015-10-18T06:24:58+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xap1/v/t15.0-10/p128x128/12105527_10156176467530352_20897126_n.jpg?oh=bc4f0c042df6ab4cc4e4fe57216918b5&oe=56CF4141&__gda__=1452418134_05d1750358a5ebfef79f709d483c5310",
            "source": "https://fbcdn-video-a-a.akamaihd.net/hvideo-ak-xat1/v/t43.1792-2/12069367_10156176467330352_569151695_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=260&oh=83731bb51a1e9045c3573a890d8294ef&oe=562A1A31&__gda__=1445580721_06dca40c76dc41e49aef76ca0ea2a131",
            "length": 11.466
         },
         {
            "id": "10156172330835352",
            "name": "Watch  Rampage LIVE today on RedBull.TV",
            "description": "Top to bottom  Rampage 2015.",
            "updated_time": "2015-10-16T19:45:03+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xpa1/v/t15.0-10/p128x128/12108509_10156172339765352_898652386_n.jpg?oh=434750e5d3f8b0d4e68780a60f7d27de&oe=568B47A1&__gda__=1455602089_0bfcbd545eb47f2fe79fef106ff7e603",
            "source": "https://video.xx.fbcdn.net/hvideo-xap1/v/t43.1792-2/12089841_10156172336075352_1619376455_n.mp4?efg=eyJybHIiOjMzOTQsInJsYSI6NDA5NiwidmVuY29kZV90YWciOiJoZCJ9&rl=3394&vabr=2263&oh=485afcfba4ea7327672ab62d679270ce&oe=5628D851",
            "length": 112.479
         },
         {
            "id": "10156172109215352",
            "name": "LIVE :  Rampage on RedBull.TV",
            "description": "Goin big over the Rampage canyon gap!",
            "updated_time": "2015-10-16T17:30:12+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xat1/v/t15.0-10/p128x128/12103477_10156172110970352_645503603_n.jpg?oh=d52ec0e61b18d3fe63b7f30700ca4076&oe=56CBC570&__gda__=1451591041_e8e280749fd1048af4d4402f95ecd12f",
            "source": "https://video.xx.fbcdn.net/hvideo-xat1/v/t43.1792-2/12069346_10156172110735352_1274838345_n.mp4?efg=eyJybHIiOjM0OTksInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=3499&vabr=2333&oh=5a778fc91cdf3b6eeaed18a48ad6fb17&oe=5628D5A9",
            "length": 14.981
         },
         {
            "id": "10156171738205352",
            "description": "Watch Claudio Caluori conquer the  Rampage 2015 track",
            "updated_time": "2015-10-16T14:51:51+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xpa1/v/t15.0-10/p128x128/12103456_10156171741845352_692546036_n.jpg?oh=51c8eb6b178c7ae831d70335195625d6&oe=56C18116&__gda__=1456504350_3d489d2c85d76eb670f42c7e9bbe8bfc",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xft1/v/t43.1792-4/12000738_10156171741570352_243564662_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=a1dd58cb9f1b8bac335967783825d361&oe=562A1D0F&__gda__=1445521373_5db6e30209852f10eeea1ee55374f514",
            "length": 165.432
         },
         {
            "id": "10156169116655352",
            "description": "Right here, right now. In Motion.",
            "updated_time": "2015-10-16T01:00:04+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xpt1/v/t15.0-10/p128x128/12103487_10156169164020352_1706685650_n.jpg?oh=1eb946eb70597586f5503b2c25bcb4ca&oe=56C71C45&__gda__=1455135454_709f76b9af696f32da72d5a2623638ff",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xfp1/v/t43.1792-4/12000500_10156169118100352_1232750531_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=9a2b900283745421a1bfb9feddefc1c4&oe=5628EF89&__gda__=1445517588_eb63f3f18cf2981f2a7b8ca20d499446",
            "length": 32.24
         },
         {
            "id": "10156169114280352",
            "name": "Watch  Rampage LIVE today on RedBull.TV",
            "description": "Scariest course preview ever?",
            "updated_time": "2015-10-16T09:00:07+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xtp1/v/t15.0-10/p128x128/12104301_10156169118610352_1298872555_n.jpg?oh=8314076826a91ba6b27cd8a20dfacc79&oe=56C7C13E&__gda__=1451603515_442b073486dde91f6d69ccf439bfbf89",
            "source": "https://scontent.xx.fbcdn.net/hads-xpt1/v/l/t43.1792-4/12128860_10156169118260352_1373079813_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=432356f70a600c1d6bc651443a63a87d&oe=562A071E",
            "length": 165.432
         },
         {
            "id": "10156169048315352",
            "description": "It's a Checkmate: http://win.gs/1Ox2hhl #skateboarding",
            "updated_time": "2015-10-15T15:46:10+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xat1/v/t15.0-10/p128x128/12104268_10156169049520352_2097406308_n.jpg?oh=d7cc4872fd44ce9c1beec0b0cc5723d2&oe=568BC09F&__gda__=1451558545_3ed4570d49a4df12bcd07bd55a2752ac",
            "source": "https://video.xx.fbcdn.net/hvideo-xap1/v/t43.1792-2/12069064_10156169049345352_2085161003_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=481&oh=d06e622ce1c94d55838e533227e2c51b&oe=5629C86A",
            "length": 34.96
         },
         {
            "id": "10156169011970352",
            "description": "How do you slide into the weekend? #RedBullRevisited",
            "updated_time": "2015-10-17T09:00:04+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xtp1/v/t15.0-10/p128x128/12106611_10156169015425352_1725383717_n.jpg?oh=307159a836266b1ff9332d39e60c4aec&oe=56922FBC&__gda__=1452039609_3918a345d1bbe4ef6043375765f7a76e",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xfa1/v/t43.1792-4/11914328_10156169015170352_2006767005_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=777872292186bbcdb2f8d11a1d7afff6&oe=5628F4D2&__gda__=1445586219_f923929d40ae185a0d008f2b5ebab246",
            "length": 59.72
         },
         {
            "id": "10156166134410352",
            "name": " Stratos - Mission to the Edge of Space",
            "description": "Throwback Wednesday. (To this day in 2012) http://www.redbullstratos.com",
            "updated_time": "2015-10-14T16:09:19+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xat1/v/t15.0-10/p128x128/12109479_10156166141075352_936940714_n.jpg?oh=1e3e4cae3295ae3aed092773cc44ece3&oe=56C6BE39&__gda__=1455543752_59f31e5df721202f5caf82b582dee906",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xat1/v/t43.1792-4/12031231_10156166140355352_1363076189_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=bb7035ff7c931d01932435ce6dd90aed&oe=5628D44E&__gda__=1445582520_286c1b163f2c534076e2b07cf3b00fd1",
            "length": 92.32
         },
         {
            "id": "10156161544615352",
            "description": "Get ready to rumble.",
            "updated_time": "2015-10-15T09:00:05+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xta1/v/t15.0-10/p128x128/12106598_10156161546990352_842563509_n.jpg?oh=638e3873a2793198e2f3343fb7772868&oe=56D17BBF&__gda__=1451871882_f24b38a81b3fac59a2c8e98cf7ab785a",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xap1/v/t43.1792-4/12077785_10156161546715352_1544398413_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=4c560edd58902c5bcccad793788d6910&oe=5628E1B5&__gda__=1445577094_dc771224d6096c9f0d2ea9c8b4e8f52f",
            "length": 53.4
         },
         {
            "id": "10156160883065352",
            "name": "Watch  Rampage LIVE on  TV Oct. 16th",
            "description": "Who's ready for  Rampage tomorrow? We sure as hell are.",
            "updated_time": "2015-10-15T15:00:02+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xtp1/v/t15.0-10/p228x119/12109615_10156161780210352_1004292022_n.jpg?oh=e00ad902bba64546fdede7c34cb9c0f3&oe=56BA4CEF&__gda__=1455866858_b3f3d6309401a705e9d87472a0410d71",
            "source": "https://fbcdn-video-i-a.akamaihd.net/hvideo-ak-xfa1/v/t43.1792-2/12065199_10156160884280352_1969439013_n.mp4?efg=eyJybHIiOjE1MDAsInJsYSI6MTIxNywidmVuY29kZV90YWciOiJoZCJ9&rl=1500&vabr=904&oh=19c1e039b183e24c69312b62cde90374&oe=5628D379&__gda__=1445580232_39e848cee4c408205bca4673b66eba94",
            "length": 71.84
         },
         {
            "id": "10156158373320352",
            "description": "Take the line less climbed.",
            "updated_time": "2015-10-12T14:29:33+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xtp1/v/t15.0-10/p128x128/12104357_10156158383630352_1365327700_n.jpg?oh=8ffc8c9ed8c94953f68037b2a77cf18a&oe=56BA9DE9&__gda__=1456606188_765a5c3e936f51d83b50a20f175aa57c",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xat1/v/t43.1792-4/12057793_10156158383325352_620869838_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=d7ee043f3c7667b1875062283911d5c5&oe=5628DC6B&__gda__=1445518575_9c1b6461f9714b705b1c90a62aa37219",
            "length": 34.659
         },
         {
            "id": "10156153810370352",
            "name": "James Stewart's Final Run",
            "description": "Welcome back, James Stewart.",
            "updated_time": "2015-10-11T00:00:02+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xta1/v/t15.0-10/p128x128/12103520_10156153815270352_1349152425_n.jpg?oh=80a303b94a85cabefd6b205e332015ac&oe=5691D8E9&__gda__=1456187525_a8d3be6a5bd2e7135e6806e005fb2cd0",
            "source": "https://video.xx.fbcdn.net/hvideo-xap1/v/t43.1792-2/12123598_10156153815025352_787901649_n.mp4?efg=eyJybHIiOjIxNjYsInJsYSI6MTIyOCwidmVuY29kZV90YWciOiJoZCJ9&rl=2166&vabr=1444&oh=567e0e5dc7677ff7a28a3121b390ee1d&oe=5629D499",
            "length": 45.378
         },
         {
            "id": "10156153135390352",
            "description": "The evolution of Supercross starts now. Tune in to  Straight Rhythm LIVE on  TV!",
            "updated_time": "2015-10-10T20:02:05+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xtp1/v/t15.0-10/p128x128/12106603_10156153147330352_1884618736_n.jpg?oh=16c4aec674cbe63eff9feb13bc74c92f&oe=56D0B9E9&__gda__=1456240876_3f388d600c08fa7d965dc51de4dac01b",
            "source": "https://video.xx.fbcdn.net/hvideo-xfp1/v/t43.1792-2/11842369_10156153146950352_835653811_n.mp4?efg=eyJybHIiOjE4ODIsInJsYSI6MTE4NywidmVuY29kZV90YWciOiJoZCJ9&rl=1882&vabr=1255&oh=2a7880867318689b2d27b086e2bdf496&oe=562A1686",
            "length": 50.483
         },
         {
            "id": "10156149679315352",
            "description": "Up, down, up, down. Feel the beat, riding through  Straight Rhythm.",
            "updated_time": "2015-10-09T10:58:08+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xtp1/v/t15.0-10/p228x119/12104377_10156149680530352_1302966144_n.jpg?oh=155d66aad0e6cbc0807b45def9306147&oe=56C193CB&__gda__=1452070862_697c94d97ba564db4e9c3f0fb18c65f5",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xpa1/v/t43.1792-4/11946062_10156149680400352_854593538_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=e0bb9b3bf91e704eab5552a703f9c56a&oe=5629B043&__gda__=1445592331_f0d438dcdfd7a8cb179c39c09f74331e",
            "length": 57.44
         },
         {
            "id": "10156148875070352",
            "name": "Watch  Straight Rhythm on  TV / Oct. 10",
            "description": "The evolution of motocross returns.  Straight Rhythm live on  TV tomorrow.",
            "updated_time": "2015-10-09T15:00:05+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xap1/v/t15.0-10/p128x128/12109463_10156148899930352_2126972296_n.jpg?oh=64a88349d8d08c6872de94ad61228d3d&oe=56BD6614&__gda__=1455143463_ca213131bf58b3243a8e9cfdde010780",
            "source": "https://video.xx.fbcdn.net/hvideo-xta1/v/t43.1792-2/12057807_10156148877125352_2112980390_n.mp4?efg=eyJybHIiOjIyNzUsInJsYSI6MTkzOSwidmVuY29kZV90YWciOiJoZCJ9&rl=2275&vabr=1517&oh=b83cca38bac06cb1e248143b3ba498ff&oe=5629F3A0",
            "length": 68.201
         },
         {
            "id": "10156147537095352",
            "name": "RedBull.COM/Rampage",
            "description": "Think you've seen it all? Think again.",
            "updated_time": "2015-10-11T15:00:05+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xap1/v/t15.0-10/p128x128/12108364_10156147538285352_1867685787_n.jpg?oh=c5c23e26eecbdf0023f2e4194c24f7fe&oe=56CE1E1A&__gda__=1451742249_12aab6b0d388526b8929eea8fba86036",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xat1/v/t43.1792-4/12046000_10156147538100352_262119926_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=27f2ce6180a77e9da4116f267bfbeb30&oe=5628E9AE&__gda__=1445583402_595d773cb4d5b6ca441c4630af30f35f",
            "length": 14.981
         },
         {
            "id": "10156146952605352",
            "name": "David Lama achieves first ascent of the Baatara gorge in Leban...",
            "description": "See David Lama climb the undiscovered Baatara Gorge http://win.gs/1FYOGwi",
            "updated_time": "2015-10-08T10:20:32+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xap1/v/t15.0-10/p128x128/12109505_10156146953110352_711293450_n.jpg?oh=b1f5e394448ed12606215f84b5bb0dde&oe=5690EDAC&__gda__=1456344838_28b8e6f4e49084e33fabd63ed557ca70",
            "source": "https://fbcdn-video-k-a.akamaihd.net/hvideo-ak-xat1/v/t43.1792-2/12137701_10156146953065352_1286231308_n.mp4?efg=eyJybHIiOjE4MDksInJsYSI6MTAyNCwidmVuY29kZV90YWciOiJoZCJ9&rl=1809&vabr=1206&oh=120f92eb08df562b7b16464641c723ae&oe=5628ECBE&__gda__=1445517952_98cfacfbcd3168504bec8486fd9cc46d",
            "length": 15.014
         },
         {
            "id": "10156144461175352",
            "description": "Slow dope.",
            "updated_time": "2015-10-07T14:00:04+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xta1/v/t15.0-10/p128x128/12105427_10156144465480352_1990294113_n.jpg?oh=3db89fa99479fd95907f282e64e345b5&oe=56C39CFD&__gda__=1455602833_3288eea0bbb52e6189286125875a8e8d",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xap1/v/t43.1792-4/12123640_10156144465025352_708396680_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=8cc5d3c37d25a57bcc97f9d851c25e0d&oe=5629C382&__gda__=1445520459_7ec11d1116fc744ea0004d508a1b8fa0",
            "length": 201.56
         },
         {
            "id": "10156138430375352",
            "description": "Always tie your shoelaces.",
            "updated_time": "2015-10-05T14:30:54+0000",
            "picture": "https://fbcdn-vthumb-a.akamaihd.net/hvthumb-ak-xtp1/v/t15.0-10/p128x128/12104370_10156138431930352_1198295540_n.jpg?oh=e782863e173e02d8ac15eabe516f8b74&oe=56BE3987&__gda__=1456367490_a8e6079fcf937a2ff4c3e8d48a5e17e1",
            "source": "https://fbcdn-creative-a.akamaihd.net/hads-ak-xat1/v/t43.1792-4/12057602_10156138431665352_224889556_n.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6ImhkIn0\u00253D&oh=75ad96cc00439e8943d897a721acf77f&oe=5629EE92&__gda__=1445592342_4d13cb443f0a2c88bdc084a23310006b",
            "length": 39
         }];
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

app.controller("product",function($scope,$rootScope){

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
});

app.controller("deals",function($scope){

    $scope.title="Promotions";
    $scope.promotions=[
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"Check out our newest items on Sale",title:"The Big Summer Promotion"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"10% off Selected Items",title:"The Big Summer Promotion"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"Buy one get one free",title:"The Big Summer Promotion"},
      {src:"https://www.buckeyehvacparts.com/wp-content/themes/cheap-hvac-parts/images/image_coming_soon.png",descr:"Check out our newest items on Sale",title:"The Big Summer Promotion"},
    ];
});

app.controller("about",function($scope,$rootScope, pullFb){
    $scope.title="About us";
    $rootScope.about=pullFb.getAbout();
});

app.controller("events",function($scope,$rootScope,pullFb,ModalService){
    $scope.title="Events";
    $rootScope.events=pullFb.getEvents();
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

    $scope.show = function(src) {
      $rootScope.src=src;
      console.log(src);
       ModalService.showModal({
           templateUrl: 'views/template.html',
           controller: "ModalController",
       });
   };

});

app.controller('ModalController', function($scope, close,$rootScope,$sce) {
$scope.play = $sce.trustAsResourceUrl($rootScope.src);
console.log($scope.play);
 $scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

 $scope.send=function(user,email,tel){
   console.log($rootScope.brand);
   console.log(user + email+tel);
   //save it and put it up
   this.close('yes');
 }

});


app.controller("albums",function($scope,$rootScope,pullFb){
$rootScope.photos=pullFb.getPhotos();
    $scope.title="Photos";
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
      $http({
                  url: 'https://fan-server.herokuapp.com/send',
                  type: "POST",
                  data: "test",
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
    $scope.clickSearch = function(){
        $scope.query = "";
    };

    $scope.show = function(src) {
      $rootScope.src=src;
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

  $scope.signup=function(){
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
