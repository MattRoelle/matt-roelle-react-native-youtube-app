import { LineGraph } from "./components/LineGraph";
import { tw } from "./tailwind";
import { ScrollView, View, Text } from "react-native";

export default function App() {
  return (
    <ScrollView style={[tw`flex-1 pb-8 pt-12`]}>
      <View style={[tw`p-4`]}>
        <Text style={[tw`text-2xl mb-2`]}>Let's code a Line Graph</Text>
        <LineGraph
          data={[12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70]}
          style={[tw`mb-4`]}
          color="rose"
          label="views"
          stat="120k"
        />
        <LineGraph
          data={[12, 5, 9, 30, 20, 51, 20, 1, 4, 2, 70]}
          style={[tw`mb-4`]}
          color="sky"
          label="views"
          stat="120k"
        />
      </View>
    </ScrollView>
  );
}
