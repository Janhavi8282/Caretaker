import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";

const NewsDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const title = route.params?.title;
  const image = route.params?.image;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <Image style={styles.image} source={{ uri: image }}></Image>
        <Text style={styles.title}>{title}</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.content}>
            Lorem labore excepteur laboris fugiat enim. Velit ut dolor culpa est
            minim dolore ut consectetur aute dolore aliquip cupidatat tempor
            reprehenderit. Esse nulla pariatur pariatur velit ad exercitation in
            ullamco proident irure Lorem amet. Ad ex aliquip consectetur magna
            cillum nulla est adipisicing. Irure ea tempor consequat veniam
            officia id velit commodo tempor laborum aliqua ad enim sint. Ad ut
            labore aliqua sit amet. Est ut amet id nostrud nostrud tempor
            cupidatat ea proident adipisicing duis est in dolor. Nulla aute
            proident ipsum est aliqua laboris non quis nostrud adipisicing
            pariatur. Cillum adipisicing esse est duis nisi minim do nisi
            deserunt excepteur ullamco. Irure qui in elit officia occaecat aute
            et minim dolor duis ut veniam ad excepteur. Ut tempor reprehenderit
            esse deserunt tempor pariatur exercitation do ipsum ut eiusmod
            voluptate est ipsum. Deserunt pariatur excepteur nostrud eu elit
            proident amet exercitation excepteur officia amet elit sint. Et
            voluptate tempor deserunt et excepteur deserunt officia aliquip
            aliquip sit enim aute aliqua. Deserunt voluptate ut amet minim et ut
            voluptate ullamco. Sint exercitation tempor do nulla officia fugiat
            Lorem. Proident nisi id est aute reprehenderit id et tempor commodo
            aliqua ut. Et cillum esse deserunt voluptate eu consequat. Enim
            consectetur ullamco duis non qui deserunt Lorem nostrud. Fugiat est
            pariatur aliqua et commodo duis commodo ullamco esse aliquip minim.
            Qui incididunt nulla voluptate ullamco ad elit non laboris aute
            excepteur. Exercitation dolore excepteur elit adipisicing aliquip eu
            sit labore tempor eiusmod laborum aliqua ut. Adipisicing pariatur
            magna nostrud esse non anim ex incididunt. Reprehenderit consectetur
            incididunt culpa eiusmod veniam eu. Dolor incididunt aute nulla
            consequat. Anim labore minim eiusmod id culpa pariatur mollit ipsum
            deserunt. Sint nulla pariatur ad exercitation consectetur et in
            proident et dolore eiusmod pariatur consectetur est. Consequat esse
            laborum aliqua exercitation dolor dolore magna enim proident laborum
            labore. Irure aliquip sint ad eu esse occaecat aute. Esse esse elit
            eu voluptate. Elit incididunt ullamco labore culpa sint. Sunt
            consectetur commodo excepteur est proident sit enim consequat sint
            reprehenderit exercitation cupidatat id. Sint est do enim proident
            dolor dolor aute et quis. Aliquip elit commodo eu irure deserunt ut
            proident. Aliqua culpa esse proident magna laborum non adipisicing.
            Tempor non officia dolore consequat in ea culpa minim ullamco Lorem
            nostrud. In aliquip adipisicing non velit occaecat ipsum commodo ea
            quis pariatur cillum nisi voluptate incididunt. Esse voluptate
            cillum commodo fugiat. Amet ex exercitation dolor enim qui aute
            dolore deserunt. Mollit in aliqua reprehenderit qui velit aute.
            Cupidatat anim mollit et culpa ullamco dolore fugiat incididunt
            proident incididunt ex sint irure anim. Id enim voluptate nostrud
            officia do id id nisi non adipisicing irure. Mollit irure nostrud
            non eu elit esse esse qui qui cillum. Irure in commodo enim
            cupidatat ea esse. Est dolore cillum do exercitation proident ea
            ipsum est aute. Nulla fugiat qui esse eu do consectetur irure
            excepteur. Fugiat enim nulla occaecat occaecat amet officia
            cupidatat consectetur ad mollit nostrud. Irure velit ad
            reprehenderit commodo et ex ipsum sit velit cupidatat ut deserunt
            laboris duis. Mollit adipisicing mollit esse duis labore adipisicing
            non laborum. Sint elit ex labore reprehenderit. Ullamco esse minim
            irure id aliqua exercitation duis labore nulla. Et quis exercitation
            ut proident irure officia sit esse ea id dolor incididunt. Sit
            consectetur laborum elit minim cupidatat quis sunt amet ad tempor
            elit cupidatat do anim. Ut qui mollit voluptate dolor aliquip
            exercitation proident irure officia reprehenderit excepteur.
            Reprehenderit reprehenderit pariatur eu nulla eiusmod fugiat
            proident adipisicing quis aute. Eu veniam id consequat tempor
            eiusmod eu aliqua anim duis voluptate enim pariatur. Aliqua aute ea
            minim non enim dolor nisi consectetur sunt esse et pariatur mollit.
            Pariatur do laborum sint deserunt labore anim ut consectetur duis ex
            officia mollit pariatur exercitation.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 16,
  },
  content: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "justify",
  },
  scrollView: {},
});
export default NewsDetailScreen;
