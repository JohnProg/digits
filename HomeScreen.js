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
var {
  NavigatorIOS,
  PickerIOS,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} = React;

var FilteredContacts = require('./FilteredContacts');

var PickerItemIOS = PickerIOS.Item;


var GENDER = ['Females', 'Males'];

var CITY = ['San Francisco', 'Seattle', 'Los Angeles', 'D.C.', 'New York City', 'Atlanta'];


var HomeScreen = React.createClass({
  getInitialState: function() {
    return {
      genderIndex : 0,
      cityIndex : 0,
      filtersSelected: '',
    };
  },

  submitFilters: function() {
    var selectionStringDup = GENDER[this.state.genderIndex] + 
      ' in ' + CITY[this.state.cityIndex];
    this.setState({filtersSelected: selectionStringDup})
    return this.props.navigator.push({
        title: this.state.filtersSelected,
        component: FilteredContacts,
        passProps: {
          text: this.state.filtersSelected,
        }
      });
  },

  render: function() {
    var selectionString = GENDER[this.state.genderIndex] + 
      ' in ' + CITY[this.state.cityIndex];
    return (
      <View style={styles.container}>    
        <PickerIOS
          selectedValue={this.state.genderIndex}
          onValueChange={(genderIndex) => this.setState({genderIndex})}>
          {GENDER.map((genderType, genderIndex) => (
            <PickerItemIOS
              key={genderIndex}
              value={genderIndex}
              label={genderType} />
          ))}
        </PickerIOS>
        <Text style={styles.note}> Choose Gender:</Text>
        <PickerIOS
          selectedValue={this.state.cityIndex}
          onValueChange={(cityIndex) => this.setState({cityIndex})}>
          {CITY.map((cityName, cityIndex) => (
            <PickerItemIOS
              key={cityIndex}
              value={cityIndex}
              label={cityName} />
          ))}
        </PickerIOS>
        <Text style={styles.note}> Choose City:</Text>
          <View style={styles.container}>
          <TouchableHighlight
            style={styles.wrapper}
            activeOpacity={1}
            animationVelocity={0}
            underlayColor="rgb(210, 230, 255)"
            onPress={this.submitFilters}>
            <View style={styles.button}>
              <Text style={styles.note}>
                Submit!
              </Text>
            </View>
          </TouchableHighlight>
          </View>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
  },
  wrapper: {
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
  note: {
    fontSize:20,
    textAlign: 'center',
    fontWeight:'bold',
  },
  textBlock: {
    fontSize: 16,
    margin: 10,
    textAlign: 'center',
    fontWeight: '500',
    color: 'blue',
  },
  button: {
    padding:5,
    borderRadius:3,
    borderWidth:1,
    margin: 5,
    borderColor: 'rgba(0,0,0,.8)'
  },
   separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
});

module.exports = HomeScreen;
