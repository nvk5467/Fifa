import * as React from 'react';
import { View, Image, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useRef } from 'react';
import { Card } from '@rneui/themed';
import { SelectList } from 'react-native-select-bottom-list';
import * as SQLite from 'expo-sqlite';


export default function HomeScreen() {
  const [text, onChangeText] = React.useState('');
  const [num, onChangeNum] = React.useState(0);
  const [value, setValue] = React.useState('Select');
  const [min, setMin] = React.useState('Select');
  const [max, setMax] = React.useState('Select');
  const [tempData, setTempData] = React.useState('');
  const [teamNation, setTeamNation] = React.useState();
  const [teamId, setTeamId] = React.useState('');
  const [team1, setTeam1] = React.useState('');
  const [team2, setTeam2] = React.useState('');
  const [team1Rating, setTeam1Rating] = React.useState('');
  const [team2Rating, setTeam2Rating] = React.useState('');
  const [team1Link, setTeam1Link] = React.useState('');
  const [team2Link, setTeam2Link] = React.useState('');
  const teamsData = [
    'England',
    'Portugal',
    'France',
    'Germany',
    'Argentina',
    'Spain',
    'Italy',
    'Netherlands',
    'Belgium',
    'Croatia',
    'Denmark',
    'Poland',
    'Morocco',
    'Mexico',
    'Norway',
    'Ghana',
    'Sweden',
    'Czech Republic',
    'Ukraine',
    'Scotland',
    'United States',
    'Hungary',
    'Wales',
    'Republic of Ireland',
    'Iceland',
    'Romania',
    'Finland',
    'Northern Ireland',
    'Qatar',
    'New Zealand'
  ];
  
  const overallData = [
    5.0,  // England
    5.0,  // Portugal
    5.0,  // France
    5.0,  // Germany
    5.0,  // Argentina
    5.0,  // Spain
    4.5,  // Italy
    4.5,  // Netherlands
    4.5,  // Belgium
    4.5,  // Croatia
    4.5,  // Denmark
    4.0,  // Poland
    4.0,  // Morocco
    4.0,  // Mexico
    4.0,  // Norway
    4.0,  // Ghana
    4.0,  // Sweden
    4.0,  // Czech Republic
    4.0,  // Ukraine
    4.0,  // Scotland
    4.0,  // United States
    3.5,  // Hungary
    3.5,  // Wales
    3.5,  // Republic of Ireland
    3.5,  // Iceland
    3.5,  // Romania
    3.0,  // Finland
    3.0,  // Northern Ireland
    2.5,  // Qatar
    2.5   // New Zealand
  ];
  
  const ratingData = [
    Math.round((86 + 83 + 83) / 3),
    Math.round((86 + 84 + 83) / 3),
    Math.round((85 + 85 + 83) / 3),
    Math.round((84 + 83 + 84) / 3),
    Math.round((85 + 83 + 83) / 3),
    Math.round((81 + 84 + 82) / 3),
    Math.round((80 + 85 + 82) / 3),
    Math.round((82 + 80 + 83) / 3),
    Math.round((81 + 81 + 77) / 3),
    Math.round((78 + 82 + 78) / 3),
    Math.round((76 + 80 + 79) / 3),
    Math.round((80 + 77 + 74) / 3),
    Math.round((78 + 75 + 79) / 3),
    Math.round((77 + 76 + 75) / 3),
    Math.round((91 + 78 + 74) / 3),
    Math.round((77 + 77 + 75) / 3),
    Math.round((77 + 76 + 74) / 3),
    Math.round((75 + 77 + 75) / 3),
    Math.round((73 + 77 + 73) / 3),
    Math.round((70 + 76 + 76) / 3),
    Math.round((76 + 75 + 74) / 3),
    Math.round((76 + 72 + 73) / 3),
    Math.round((73 + 74 + 73) / 3),
    Math.round((71 + 71 + 73) / 3),
    Math.round((71 + 70 + 71) / 3),
    Math.round((70 + 72 + 69) / 3),
    Math.round((70 + 70 + 67) / 3),
    Math.round((66 + 71 + 71) / 3),
    Math.round((68 + 69 + 68) / 3),
    Math.round((67 + 66 + 66) / 3)]
  
  
  const teamURL = [
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1318.png',  // England
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1354.png',  // Portugal
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1335.png',  // France
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1337.png',  // Germany
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1369.png',  // Argentina
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1362.png',  // Spain
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1343.png',  // Italy
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/105035.png',  // Netherlands
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1325.png',  // Belgium
    4.5,  // Croatia
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1331.png',  // Denmark
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1353.png',  // Poland
    4.0,  // Morocco
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1386.png',  // Mexico
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1352.png',  // Norway
    4.0,  // Ghana
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1363.png',  // Sweden
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1330.png',  // Czech Republic
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1366.png',  // Ukraine
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1359.png',  // Scotland
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1387.png',  // United States
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1886.png',  // Hungary
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1367.png',  // Wales
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1355.png',  // Republic of Ireland
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1341.png',  // Iceland
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1356.png',  // Romania
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/1334.png',  // Finland
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/110081.png',  // Northern Ireland
    2.5,  // Qatar
    'https://fifastatic.fifaindex.com/FIFA24/teams/light/111473.png'   // New Zealand
  ];
  
  let overalls = [5.0, 4.5, 4.0, 3.5, 3.0, 2.5];




  const initializeDatabase = async () => {
      
    db = await SQLite.openDatabaseAsync("database.db");
    console.log("Database created!");

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS Teams (id INTEGER PRIMARY KEY AUTOINCREMENT, nation TEXT, league TEXT, rating REAL, overall INTEGER, link TEXT)
      `);
    console.log('Table created')

    await db.execAsync('DELETE FROM Teams');
    await db.execAsync("DELETE FROM sqlite_sequence WHERE name='Teams'");
    
    
    for(let x = 0; x < teamsData.length; x++)
    {
      const team = teamsData[x];
      overalls = overallData[x];
      ratings = ratingData[x];
      link = teamURL[x];
      console.log(team)
      await db.runAsync('INSERT INTO Teams (nation, league, rating, overall, link) VALUES (?, ?, ?, ?, ?)', [team, 'International', ratings, overalls, link]);
    }

    console.log('Teams inserted');
    
    first_row = await db.getAllAsync('SELECT * FROM Teams');
    console.log('Db first row, ', first_row);
    

  };

  // Initialize Database
  useEffect(() => {
    initializeDatabase().catch((error) => {
      console.error('Database initialization error:', error);
    });
  }, []);

  // Gets List of teams
  const findTeam = async (min, max) => {
    try {
      const data = await db.getAllAsync(`
        SELECT nation, id, overall, rating, link
        FROM Teams 
        WHERE overall BETWEEN ? AND ?
      `, [min, max]);
      
      if (data && data.length > 0) {
        setTempData(data);  // Only set tempData if data is found
        console.log(tempData);
        randTeam();
        
      } else {
        console.log("No teams found for this overall rating");
        setTempData([]);  // Clear tempData if no matching teams found
      }
    } catch (error) {
      console.error('Error finding team:', error);
    }
  };
  

  // Execute when tempData is updated
  useEffect(() => {
    if (tempData && tempData.length > 0 && num !== 0) {
      let team1Data = tempData.find(item => item.id === num[0]);
      let team2Data = tempData.find(item => item.id === num[1]);
      console.log(num[0], num[1]);
      console.log('Team1 :', team1Data);
      console.log('Team2 :', team2Data);
      
      if (team1Data && team2Data) {
        setTeam1(team1Data); // Set the nation for team1
        setTeam2(team2Data); // Set the nation for team2
        
        // setTeam1Rating(team1Data.rating); // Set the rating for team1
        // setTeam2Rating(team2Data.rating); // Set the rating for team2

        // setTeam1Link(team1Data.link); // Set the link for team1
        // setTeam2Link(team2Data.link); // Set the link for team2

        console.log('Num:', num);
        console.log('Team1 Nation:', team1.nation, "Team1 overall: ", team1Data.overall, "Team1 link: ", team1.link);
        console.log('Team2 Nation:', team2Data.nation, "Team2 overall: ", team2Data.overall);
      } else {
        console.log('No item found with id:', num);
      }
    }
  }, [tempData, num]); // Ensure that this runs when both tempData and num update
  
  
  
// Returns id of team (num)
  const randTeam = () => {
    let id = tempData.map((item) => item.id); // Correctly map out the ids from tempData
    console.log('IDs: ', id); 
    console.log('Length: ', id.length);
    
    let randomNum = Math.floor(Math.random() * id.length); // Generate random index
    const selectedId = []; // Get the id at the random index
    selectedId.push(id[randomNum]);
    randomNum = Math.floor(Math.random() * id.length);
    selectedId.push(id[randomNum]);
    console.log('RandNum: ', selectedId);

    onChangeNum(selectedId); // Set the num state with the selected ID
  };


  return (
    <ScrollView style = {{ backgroundColor: '#222222',}}>
      <View style = {styles.container}>
        <Text style = {styles.titleBase}>EAFC</Text>
        <Text style = {styles.titleInner}>24</Text>
      </View>

      <View style = {styles.cardContainer}>
        <Card containerStyle = {styles.card}>
            <Text styles style = {styles.baseText}>
              Find your
              <Text style = {styles.innerText}> next match!</Text>
            </Text>

            <View style = {{flexDirection: 'column', margin: 25}}>
              <SelectList 
                onSelect={(item) => setMin(item)}
                value = {min}
                data = {overalls}
                headerTitle = "Min Overall"
                style = {{marginBottom: 10}}
                textStyle = {{color: 'grey'}}
                itemStyle = {styles.selectListItem}
                itemTextStyle = {styles.selectListText}
              />
              <SelectList 
                onSelect={(item) => setMax(item)}
                value = {max}
                data = {overalls}
                headerTitle = "Max Overall"
                style = {{marginTop: 10}}
                textStyle = {{color: 'grey'}}
                itemStyle = {styles.selectListItem}
                itemTextStyle = {styles.selectListText}
              />
              <View style = {{flexDirection: 'row', marginTop: 10, alignSelf: 'center'}}>
                <TouchableOpacity style = {styles.btn} onPress={() => findTeam(min,max)}>
                  <Text style = {{fontSize: '20', color: 'black', fontWeight: 'bold'}}> Generate → </Text>
                </TouchableOpacity>
              </View>

            </View> 
            

        </Card>
        <Card containerStyle = {styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%', alignSelf: 'center' }}>
        
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, margin: 10, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
            {team1.nation}
          </Text>
          <Image
            source={{ uri: team1.link }}
            style={{ width: 75, height: 75, marginTop: 25 }}
          />
          <Text style={{ fontSize: 20, margin: 10, color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop: 25 }}>
            {team1.rating}
          </Text>
        </View>

     
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, margin: 10, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
            {team2.nation}
          </Text>
          <Image
            source={{ uri: team2.link }}
            style={{ width: 75, height: 75, marginTop: 25}}
          />
          <Text style={{ fontSize: 20, margin: 10, color: 'white', fontWeight: 'bold', textAlign: 'center', marginTop: 25 }}>
            {team2.rating}
          </Text>
        </View>
      </View>

 
          
        </Card>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 50,
    alignContent: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    marginLeft: 4,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: '',
    flexDirection: 'column',
  },
  titleBase: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  titleInner: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#48bf53'
  },
  inputContainer: {
    flex: 1,
    alignItems: 'left',
    margin: 8,
    height: 50,
    flexDirection: 'row',
  },
  input: {
    height: 50,
    width: 200,
    margin: 12,
    borderWidth: 3,
    borderRadius: 10,
    padding: 10,
    textAlign: 'left',
  },
  textContainer: {
    height: 50, 
    width: 150, 
    marginLeft: 12, 
    borderWidth: 3, 
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    textAlign: 'center',
    color: 'red',
  },
  card: {
    width: 300,
    height: 300,
    backgroundColor: 'transparent',
    borderColor: 'grey',
    alignItems: 'left',
    overflow: 'hidden',
  },
  baseText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  innerText: {
    fontWeight: 'bold',
    color: '#48bf53'
  },
  btn: {
    height: 40,
    width: 125,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#11823b',
    alignItems: 'center',
    alignText: '',
  },
  selectListItem: {
    marginBottom: 12,
    color: 'grey',
  },
  selectListText: {
    textAlign: 'right',
  }
  
});
