import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import firebaseApp from '../../config/firebase-config.js';

class FirebaseService {
  constructor(){
    this.auth = getAuth(firebaseApp);
  }

  getRecaptchaVerifier = (containerId) => {
    return new RecaptchaVerifier(this.auth, containerId, {
      size: 'invisible',
      callback: () => {
        console.log('Recaptcha solved and ready to proceed with phone number sign-in.');
      },
    });
  }

  async SendOtpToPhoneNumber(phoneNumber, recaptcha){
    return await signInWithPhoneNumber(this.auth, phoneNumber, recaptcha)
      .then((confirmationResult) => {
        console.log('OTP sent successfully:', confirmationResult);
        return confirmationResult;
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        throw error;
      });
  }
}

export default FirebaseService;