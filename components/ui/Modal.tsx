import { Modal, View, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

export default function CenteredPopup({ visible, onClose, children }: { visible: boolean; onClose: () => void; children: ReactNode }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {children}
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
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  popup: {
    backgroundColor: '#fff',
    width: '90%',
    textAlign: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
    borderRadius: 16,
    alignItems: 'center',
  },
});
