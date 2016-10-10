import ContactList from './Components/contacts/ContactList';
import NoContactErrorScreen from './Components/contacts/NoContactErrorScreen';
import Messages from './Components/messages/Messages';
import StartDate from './Components/dates/StartDate';
import EndDate from './Components/dates/EndDate';
import PhoneLoginName from './Components/authentication/phoneLoginName';
import PhoneLoginNumber from './Components/authentication/phoneLoginNumber';
import VerificationCode from './Components/authentication/verificationCode';
import Images from './Components/images/ImageWrapper';

export default {
  contacts: ContactList,
  noContactsError: NoContactErrorScreen,
  messages: Messages,
  startDate: StartDate,
  endDate: EndDate,
  phoneLoginName: PhoneLoginName,
  phoneLoginNumber: PhoneLoginNumber,
  verificationCode: VerificationCode,
  images: Images
}