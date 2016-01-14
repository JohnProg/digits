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

var AddContact = require('./AddContact')

var DUMMY = [
    {  givenName: 'Jessica',
       thumbnailPath: '',
       phoneNumbers: [ { number: '(703) 555-5555', label: 'mobile' } ],
       familyName: 'Alba',
     },
     {  givenName: 'Serena',
       thumbnailPath: '',
       phoneNumbers: [ { number: '(703) 555-5555', label: 'mobile' } ],
       familyName: 'Williams',
     },
     {  givenName: 'Mila',
       thumbnailPath: '',
       phoneNumbers: [ { number: '(703) 555-5555', label: 'mobile' } ],
       familyName: 'Kunis',
     },
];


var {
  ScrollView,
  AlertIOS,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} = React;


var FilteredContacts = React.createClass({
 getInitialState: function() {
    return {
      filteredList: [],
    };
  }, 
/*
  loadFilteredContacts: function() {
    /*
    return (
      DB.users.get({filter: this.props.filtersSelected}), function(results){
        if(results !== null || results.length !== 0) {
          this.setState({filteredList: results});      
        }  
      })
    );
  },*/

  addNewContact: function() {
    return this.props.navigator.push({
        title: 'Add Contact',
        component: AddContact,
      });

  },

  addSampleContacts: function() {
    return this.setState({filteredList: DUMMY});
  },

  callContact: function() {
    return AlertIOS.alert(
                  'Call',
                  'Ideally, this would allow you to call.',
                  [
                    {
                      text: 'Got it.',
                      onPress: () => console.log('Tapped OK'),
                    },
                  ]
                );

  },

render: function() {
  if(this.state.filteredList.length === 0) {
      return (
        <View style={styles.container}>
        <Text style={styles.note}>No Contacts Filtered...</Text>
        <TouchableHighlight
            style={styles.wrapper}
            activeOpacity={1}
            animationVelocity={0}
            underlayColor="rgb(210, 230, 255)"
            onPress={this.addNewContact}>
            <View style={styles.button}>
              <Text style={styles.note}>
                Add a Contact from Your Addressbook!
              </Text>
            </View>
          </TouchableHighlight>
        <TouchableHighlight
            style={styles.wrapper}
            activeOpacity={1}
            animationVelocity={0}
            underlayColor="rgb(210, 230, 255)"
            onPress={this.addSampleContacts}>
            <View style={styles.button}>
              <Text style={styles.note}>
                Add Sample Contacts!
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        );
    } 
  return (
    <View style={styles.container}>
      <TouchableHighlight
            style={styles.wrapper}
            activeOpacity={1}
            animationVelocity={0}
            underlayColor="rgb(210, 230, 255)"
            onPress={this.addNewContact}>
            <View style={styles.button}>
              <Text style={styles.note}>
                Add New Contact from Addressbook!
              </Text>
            </View>
          </TouchableHighlight>
          <ScrollView>
        {this.state.filteredList.map((contact) => {
          return (
            <View style={styles.container}>
            <TouchableHighlight
            onPress={this.callContact}>
             <View style={styles.button}>
              <Text>{contact.givenName} - {contact.lastName}</Text>
               <Text>{JSON.stringify(contact.phoneNumbers)}</Text>
            </View>
            </TouchableHighlight>
            </View>
          )
        })}
      </ScrollView>
      </View>
      );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
  },
  note: {
    fontSize:20,
    textAlign: 'center',
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
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
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


module.exports = FilteredContacts;
