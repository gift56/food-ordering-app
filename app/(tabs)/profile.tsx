import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { signOut } from "@/libs/appwrite";
import CustomButton from "@/components/ui/custom-button";
import { images } from "@/constants";
import CustomHeader from "@/components/ui/custom-header";
import useAuthStore from "@/stores/auth.store";
import { ProfileFieldProps } from "@/type";

const RenderProfileInfo = ({ icon, label, value }: ProfileFieldProps) => (
  <View className="profile-field">
    <View className="profile-field__icon">
      <Image source={icon} className="size-5" resizeMode="contain" />
    </View>
    <View className="flex-col items-start justify-start gap-1">
      <Text className="body-medium text-[#6A6A6A]">{label}</Text>
      <Text className="paragraph-semibold text-dark-100">{value}</Text>
    </View>
  </View>
);

const Profile: React.FC = () => {
  const { user, clearUser } = useAuthStore();

  const handleLogout = async () => {
    await signOut();
    clearUser();
    router.replace("/sign-in");
  };

  if (!user) return null;

  const { avatar, name, email } = user;

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="flex-1 px-5">
        <CustomHeader title="Profile" />
        <View className="my-3 gap-3 items-center justify-center">
          <View className="relative">
            <Image
              source={{ uri: avatar }}
              className="profile-avatar"
              resizeMode="cover"
            />
            <TouchableOpacity className="profile-edit">
              <Image
                source={images.pencil}
                className="size-4"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View className="bg-white-100 border flex-col gap-5 p-4">
            <RenderProfileInfo
              icon={images.person}
              label="Full Name"
              value={name}
            />
            <RenderProfileInfo
              icon={images.envelope}
              label="Email"
              value={email}
            />
            <RenderProfileInfo
              icon={images.phone}
              label="Phone number"
              value={"N/A"}
            />
          </View>
        </View>
        <View className="gap-5">
          <CustomButton
            title="Edit Profile"
            className="border-primary !bg-primary/25"
            textStyle="!text-primary"
          />
          <CustomButton
            leftIcon={
              <Image
                source={images.logout}
                className="size-6"
                resizeMode="contain"
              />
            }
            title="Logout"
            className="border-error !bg-error/25"
            textStyle="!text-error"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
