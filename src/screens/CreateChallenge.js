import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from './styles';

const CreateChallengeScreen = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [selectedMatrix, setSelectedMatrix] = useState('');

  const createChallenge = () => {
    // Handle creating a challenge
  };

  const onImageUpload = () => {
    // Handle image upload
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
