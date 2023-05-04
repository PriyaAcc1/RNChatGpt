import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ImageCropPicker from 'react-native-image-crop-picker';

const CreateChallengeScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [selectedMatrix, setSelectedMatrix] = useState('');

  const createChallenge = () => {
    // Handle creating a challenge
  };

  const onImageUpload = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      mediaType: 'photo',
    }).then(response => {
      const source = {uri: response.path};
      setImage(source);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Challenge</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={styles.uploadButton} onPress={onImageUpload}>
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>
        {image && (
          <Image source={image} style={styles.image} resizeMode="contain" />
        )}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Challenge Matrix:</Text>
          <Picker
            selectedValue={selectedMatrix}
            style={styles.picker}
            onValueChange={itemValue => setSelectedMatrix(itemValue)}>
            <Picker.Item label="Select a matrix" value="" />
            <Picker.Item label="Matrix 1" value="matrix1" />
            <Picker.Item label="Matrix 2" value="matrix2" />
            <Picker.Item label="Matrix 3" value="matrix3" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.createButton} onPress={createChallenge}>
          <Text style={styles.createButtonText}>Create Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateChallengeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: '#2a9df4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  pickerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerLabel: {
    marginRight: 16,
    fontSize: 16,
  },
  picker: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
