import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
//import {styles} from '../../styles/styles';
import styles from '../Login/styles';
import Images from '../../Constants/Images';
import Firebaseservices from '../../utils/FirebaseServices';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Constants/Colors';
export interface Props {
  navigation: any;
}

interface State {
  name: string;
  uid: string;
  email: string;
  password: string;
  message: string;
  showpassword: boolean;
  avatar: string;
  borderemail: number;
  borderpassword: number;
}
export default class Signin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      uid: '',
      message: '',
      showpassword: false,
      avatar: '',
      borderemail: 0,
      borderpassword: 0,
    };
  }
  componentDidMount() {
    Firebaseservices.initializeFireBase();
  }

  showPassword = (value: boolean) => {
    this.setState({
      showpassword: value,
    });
  };

  onlogin = (email: string, password: string) => {
    let user = {email: email, password: password};
    Firebaseservices.onPressLogin(user, this.loginsuccess, this.loginfailed);
  };

  loginsuccess = (data: any) => {
    console.warn(data.user.uid);
    this.setState({
      uid: data.user.uid,
    });
    console.warn('Login successfull');
    // Firebaseservices.writeinboxdata(
    //   data.user.id,
    //   this.state.email,
    //   this.state.message,
    // );
    this.props.navigation.navigate('Chatlist', {
      name: this.state.name,
      email: this.state.email,
      uid: this.state.uid,
      avatar: this.state.avatar,
    });
  };
  loginfailed = () => {
    alert('Login Failed');
  };

  onChangeEmail = () => {
    let increaseBorder = this.state.borderemail;

    setTimeout(() => {
      if (this.state.email === '') {
        increaseBorder = 0;
        // console.warn('increaseBrderxdq', this.state.email);
      } else {
        increaseBorder++;
        // console.warn('increaseBorder', this.state.email);
      }

      this.setState({borderemail: increaseBorder});
    }, 100);
    // increaseBorder++;
  };
  onChangePassword = () => {
    let increaseBorder = this.state.borderpassword;
    setTimeout(() => {
      if (this.state.password === '') {
        increaseBorder = 0;
      } else {
        increaseBorder++;
      }
      this.setState({borderpassword: increaseBorder});
    }, 100);
  };
  render() {
    return (
      <View style={styles.main}>
        {/* <Image source={Images.SignUpGraphic} style={styles.imagestyle} /> */}
        <TouchableOpacity
          style={styles.signUPbtn}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.signUpTextbtn}>Sign Up</Text>
        </TouchableOpacity>
        <SafeAreaView>
          <View style={styles.signIN}>
            <Text style={styles.signUpText}>Sign In</Text>
            <Image source={Images.icSlection} style={styles.icSlection} />
            <Text style={styles.detailsTextsignin}>
              Welcome to ChatApplication
            </Text>
          </View>
          <TextInput
            style={[
              styles.inputsignin,
              {
                borderColor:
                  this.state.borderemail >= 1
                    ? Colors.tealBlue
                    : Colors.fadedGray,
              },
            ]}
            value={this.state.email}
            placeholder="Email"
            //placeholderTextColor="#9a73ef"
            onChangeText={val => {
              this.setState({email: val});
              this.onChangeEmail();
            }}
            autoCapitalize="none"
          />
          <View>
            <TextInput
              style={[
                styles.inputsignin,
                {
                  borderColor:
                    this.state.borderpassword >= 1
                      ? Colors.tealBlue
                      : Colors.fadedGray,
                },
              ]}
              placeholder="Password"
              //placeholderTextColor="#9a73ef"
              onChangeText={val => {
                this.setState({password: val});
                this.onChangePassword();
              }}
              autoCapitalize="none"
              value={this.state.password}
              keyboardAppearance="light"
              secureTextEntry={!this.state.showpassword}
              returnKeyType="done"
              returnKeyLabel="Submit"
              keyboardType="default"
            />
            <TouchableOpacity
              style={styles.eyesignin}
              onPress={() => this.showPassword(!this.state.showpassword)}>
              <Image
                source={
                  this.state.showpassword
                    ? Images.eyeEnabled
                    : Images.eyeDisabled
                }
                style={styles.eyeOpen}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            //style={styles.submitButton}
            onPress={() => this.onlogin(this.state.email, this.state.password)}
            activeOpacity={0.8}>
            <LinearGradient
              style={styles.submitButton}
              colors={['#01a7a3', '#66eb8f']}
              start={{x: 0.0, y: 0.25}}
              end={{x: 0.5, y: 1}}>
              <Text style={styles.ButtonText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* <TouchableOpacity
          style={styles.Button}
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.ButtonText}>Signup</Text>
        </TouchableOpacity> */}
        </SafeAreaView>
      </View>
    );
  }
}
