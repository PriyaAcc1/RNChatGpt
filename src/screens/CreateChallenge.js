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
import {useDispatch} from 'react-redux';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const CreateChallengeScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [selectedMatrix, setSelectedMatrix] = useState('');
  const dispatch = useDispatch();

  const createChallenge = () => {
    // Handle creating a challenge
    const challenge = {
      id: uuidv4(),
      name: name,
      description: description,
      image: image,
      joined: false,
    };
    dispatch({
      type: 'ADD_CHALLENGE',
      payload: {
        challenge,
      },
    });
    navigation.navigate('ViewChallenges');
  };

  const onImageUpload = async () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      mediaType: 'photo',
      includeBase64: true,
    }).then(response => {
      const source = `data:${response.mime};base64,${response.data}`;
      setImage(source);
    });
  };

  return (
    <View style={styles.container}>
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
        <TouchableOpacity style={styles.createButton} onPress={onImageUpload}>
          <Text style={styles.createButtonText}>Upload Image</Text>
        </TouchableOpacity>
        {image && (
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Challenge Matrix:</Text>
          <Picker
            selectedValue={selectedMatrix}
            style={styles.picker}
            onValueChange={itemValue => setSelectedMatrix(itemValue)}>
            <Picker.Item label="Select a matrix" value="" />
            <Picker.Item label="Step Count" value="stepCount" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.uploadButton} onPress={createChallenge}>
          <Text style={styles.uploadButtonText}>Create Challenge</Text>
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
