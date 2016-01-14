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

var AddressBook = require('react-native-contacts');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var HomeScreen = require('./HomeScreen');

var Digits = React.createClass({

  getAllContacts: function() {
    AddressBook.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        // x.x
      } else {
        DB.app.add({name: "ContactList", list: contacts}, function(added_data){
          //console.log(added_data);
        })
      }
    })
  },
  render: function() {
    this.getAllContacts();
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Digits',
          component: HomeScreen,
          }
        } />
      ) 
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});


AppRegistry.registerComponent('Digits', () => Digits);

module.exports = Digits;
