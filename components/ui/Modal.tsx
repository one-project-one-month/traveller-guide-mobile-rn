import { Modal, View, Text, StyleSheet } from 'react-native';
import CustomButton from './Button';

export default function CenteredPopup({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text className='text-[20px] font-poppinBold font-semibold'>Confirmation required</Text>
          <Text className='mt-5 text-center font-poppin'>You must agree to the Terms and Conditions to continue</Text>
          <CustomButton title='Got it' onPress={onClose} className='w-full mt-10 bg-orange-500 py-[16px] rounded-[16px] mb-3' textClassName='font-poppinBold font-bold text-[18px] text-white' />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  popup: {
    backgroundColor: '#fff',
    width: '90%',
    textAlign: 'center',
    paddingHorizontal: 40,
    paddingVertical: 40,
    borderRadius: 16,
    alignItems: 'center',
  },
});
