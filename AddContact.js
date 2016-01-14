/**
 * Digits React Native App
 * built by Adil Kadir
 * https://github.com/adilk
 *
 * Adil Kadir reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * ADIL BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

'use strict';

var React = require('react-native');

// DB Emitter Initialized
var DB = require('./db');
var DBEvents = require('react-native-db-models').DBEvents;


var {
  ScrollView,
  AlertIOS,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;


var AddContact = React.createClass({
 getInitialState: function() {
    return {
      contactList: [],
      selectedContact: [],
    };
  }, 

  loadAllContacts: function() {
  	//console.log("THEY");
      DB.app.get({name: "ContactList"}, (results) => {
       //console.log("WE THE BEST 1");
        //console.log(results[0].list[0].givenName);
        if(results !== null) {
        console.log(results[0].list.length);
        this.setState({contactList: results[0].list}); 
        }    
      });
  },

  addContactToFilter: function() {
  	return AlertIOS.alert(
                  'Sorry',
                  'The add contact feature doesnt work.',
                  [
                    {
                      text: 'OK',
                      onPress: () => console.log('Tapped OK'),
                    },
                  ]
                );
  },

  warningLoad: function() {
    return AlertIOS.alert(
                  'Alert',
                  'Please wait a moment while your address book loads.',
                  [
                    {
                      text: 'OK',
                      onPress: () => this.loadAllContacts(),
                    },
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Tapped Cancel'),
                    }
                  ]
                );
  },

render: function() {
	if(this.state.contactList.length === 0){
      return (
      	<View style={styles.container}>
      	 <TouchableHighlight
            style={styles.wrapper}
            activeOpacity={1}
            animationVelocity={0}
            underlayColor="rgb(210, 230, 255)"
            onPress={this.warningLoad}>
            <View style={styles.button}>
              <Text style={styles.note}>
                Press to Load Contacts...
              </Text>
            </View>
          </TouchableHighlight>
      	</View>
      	);
    } 
    else {
  	return (
    <View style={styles.container}>
    <ScrollView>
        {this.state.contactList.map((contact) => {
          return (
          	<TouchableHighlight
          	onPress={this.addContactToFilter}>
            <View style={styles.button}>
              <Text>{contact.givenName} - {contact.familyName}</Text>
               <Text>{JSON.stringify(contact.phoneNumbers)}</Text>
            </View>
            </TouchableHighlight>
          )
        })}
      </ScrollView>
      </View>
      );
  }
	
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
  },
  contactStyle: {
	backgroundColor: 'rgba(0,0,0,.1)', 
	margin: 5, 
	padding:5,
  },
  note: {
    fontSize:20,
    fontWeight:'bold',
  },
  button: {
    padding:5,
    borderRadius:3,
    borderWidth:1,
    margin: 5,
    borderColor: 'rgba(0,0,0,.8)'
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
  },
  emptyPage: {
    flex: 1,
    paddingTop: 64,
  },
  emptyPageText: {
    margin: 10,
  },
  wrapper: {
    borderRadius: 8,
  },
});


module.exports = AddContact;
