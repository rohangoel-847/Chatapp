import {StyleSheet} from 'react-native';
import {vh, vw} from '../../Constants/Dimensions';
import Colors from '../../Constants/Colors';
const Styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  signUP: {
    marginTop: vh(10),
    left: vw(30),
  },
  signUpText: {
    fontWeight: 'bold',
    fontSize: vh(28),
  },
  icSlection: {
    width: vw(30),
  },
  detailsText: {
    marginTop: vh(15),
    fontSize: vh(15),
  },
  input: {
    width: vw(315),
    height: vh(45),
    backgroundColor: Colors.textInput,
    marginTop: vh(25),
    padding: vw(10),
    borderRadius: vh(5),
    fontSize: vh(12),
    borderWidth: vw(1),
    left: vw(30),
  },
  eye: {
    position: 'absolute',
    top: vh(40),
    right: vw(45),
  },
  eyeOpen: {
    height: vw(15),
    width: vw(25),
  },
  conditions: {
    flexDirection: 'row',
    marginTop: vh(25),
    alignItems: 'center',
  },
  checkbox: {
    marginLeft: vw(8),
    borderRadius: vh(20),
    marginRight: vw(10),
    backgroundColor: 'red',
  },
  conditionText: {
    fontSize: vh(13),
    color: Colors.fadedGray,
  },
  conditionText2: {
    fontSize: vh(13),
    color: Colors.shembe,
    marginLeft: vw(-7),
  },
  Button: {
    padding: vw(10),
    margin: vw(15),
    //marginTop: vh(30),
    height: vh(40),
    width: vw(320),
    left: vw(10),
    borderRadius: vh(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.shembe,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  uploadimage: {
    height: vw(90),
    width: vw(90),
    borderRadius: vw(45),
    //backgroundColor: 'red',
    marginTop: vh(20),
    left: vw(125),
  },
  signIN: {
    marginTop: vh(70),
    left: vw(30),
  },
  imagestyle: {
    height: vh(150),
    width: vw(110),
    position: 'absolute',
    right: vw(0),
    top: vw(0),
  },
  signUPbtn: {
    position: 'absolute',
    right: vw(10),
    top: vh(63),
    zIndex: 1,
  },
  signUpTextbtn: {
    color: Colors.shembe,
    fontSize: vh(18),
    fontWeight: 'bold',
  },
  submitButton: {
    padding: vw(10),
    marginTop: vh(30),
    height: vh(45),
    width: vw(315),
    left: vw(30),
    borderRadius: vh(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.shembe,
  },
  backview: {
    marginTop: vh(40),
    left: vw(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsTextsignin: {
    fontSize: vh(15),
    marginTop: vh(15),
  },
  backButtonImage: {
    height:vw(20),
    width:vw(20),
  },
  signin:{
    fontSize:vh(17),
  }
});
export default Styles;
