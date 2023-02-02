import React,{useEffect, useState, Suspense} from "react";
import {
  Text,
  Link,
  Center,
  HStack,
  VStack,
  Box,
  Image,
  ScrollView,
  Pressable,
  View,
  Button,
  Icon,
  Input,
  Modal,
  FlatList,
  Spinner,
  FormControl,
  SimpleGrid,
} from "native-base";



import { Dimensions, Linking } from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import PageHeader from '../components/Header/pageHeader';
import GraphService from "../services/graphService";

import { HiOutlineCheckCircle, HiOutlineInformationCircle } from 'react-icons/hi';
import { GraphStateEnum } from '../enums/graphState';
import { GraphTemplate } from '../providers/responses/templateGraph';
import { SuspenseSpinner } from '../components/SuspenseSpinner';
import { RadioCard } from "../components/GraphCreation/RadioCard";
import { TemplateCard } from "../components/GraphCreation/TemplateCard";
import { useRadio, useRadioGroup } from "@react-native-aria/radio";

const LinearGradient = require('expo-linear-gradient').LinearGradient ;

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

interface TemplatesProps {

}

const Templates: React.FC<TemplatesProps> = ({ }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [templateID, setTemplateID] = useState(null);

  const [fileUpload, setFileUpload] = useState({ loaded: false, file: {} })
  const [graphName, setGraphName] = useState("")
  const [template, selectedTemplate] = useState({ loaded: false, template: { bytes: "", idgraphsTemplates: 0, title: "", description: "", customImg: "" } })
  const [templateLoaded, setTemplateLoaded] = useState(false)
  const [templates, setTemplates] = useState<GraphTemplate[]>([])

  useEffect(() => {
    const fetchTemplates = async () => {
      const templates: GraphTemplate[] = await GraphService.listGraphsTemplates()
      setTemplates(templates)
      setTemplateLoaded(true)
    }
    fetchTemplates()
  }, [])

  

  const [step, setStep] = useState(true);

  const [graphData, setGraphData] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const fetchGraphData = async (template: any) => {
    return await GraphService.decompressGraph(template)
  }

  async function updateStep() {
    setIsLoading(true)
    fetchGraphData(template.template.bytes)
    .then(data => {
      setGraphData(JSON.parse(data))
      setStep(!step)
      setIsLoading(false)
    });
  }

  function selectTemplate(e: any){
    const template = templates.find(x => x.key === e)
        if (template !== undefined) {
            selectedTemplate({ loaded: true, template: template })
            console.log(template)
    }
  }

  const onModalVisibleChanged = (modalVisible: any) => {
    setModalVisible(modalVisible);
  }

  return  (
    <View style={{ flex: 1, alignItems: 'center', 
                   justifyContent: 'center' }}  bg="darkBlue.900" width={windowWidth} height={windowHeight}>
      <ScrollView p={["7","10"]} flexDirection={"column"}>
        <Modal isOpen={modalVisible} onClose={setModalVisible} size={"md"} borderRadius="32" >
          <Modal.Content maxH="212" borderRadius="15">
            <Modal.CloseButton />
            <Modal.Header bg="rgb(32,27,64)" borderColor={"transparent"}><Text color="#aba1ca" fontSize={"xl"}>Import a Graph</Text></Modal.Header>
            <Modal.Body bg="darkBlue.900">
              <Pressable >
                {({isPressed}) => {
                  return <Box bg="rgb(32,27,64)" style={{
                    borderRadius: 32,
                    alignContent: "center",
                    transform: [{scale: isPressed ? 0.95 : 1}]
                  }}
                  >
                    <Text color="#aba1ca" fontSize={"md"} textAlign="center" p="3">Import .GLQ</Text>
                </Box>
                }}
              </Pressable>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        
        <PageHeader title="Template Wizard" buttonName="Import .GLQ" iconName="upload" iconAs={FontAwesome} eventChanged={() => onModalVisibleChanged(true)}/>

        <Box justifyContent={"stretch"} alignItems="center" bg="rgb(32,27,64)" flexDirection={"row"} borderRadius="50" px={["3","5","7"]} mb={["3","5","7"]}>
          <Icon as={Ionicons} name="information-circle-outline" size="4" color="blue.800"/>
          <Text color="#aba1ca" fontSize={"ms"} p="2" lineHeight={'16'}>
            GraphLinq's Instant Deploy Wizard lets you choose a template, fill in variables and deploy it instantly without having to code or making any changes on the IDE
          </Text>
        </Box>

        <VStack>

          {step &&
            <TemplatesList selectTemplate={selectTemplate} isLoading={isLoading} templateLoaded={templateLoaded} template={template} templates={templates} fileUpload={fileUpload} graphName={graphName} setGraphName={setGraphName} updateStep={updateStep} />
          }
          {!step &&
            <Suspense fallback="loading">
              <TemplateVars templateData={graphData} graphName={graphName} templateName={template.template.title} templateDesc={template.template.description} step={step} setStep={setStep} />
            </Suspense>
          }

          <Box justifyContent={"stretch"}  bg="rgb(32,27,64)" flexDirection={"column"} borderRadius="12" p={["7","10","15"]}>
            <Icon alignSelf={"center"} as={Ionicons} name="information-circle-outline" size="9" color="blue.800"/>
            <Text color="white" fontSize={"xl"} px="5" textAlign={"center"} bold pb="3">
              How to use a template?
            </Text>
            <Text color="#aba1ca" fontSize={"md"} > You can: </Text>
            <Text color="#aba1ca" fontSize={"md"} > - Select a template from the list </Text>
            <Text color="#aba1ca" fontSize={"md"} > - Fill in required variables </Text>
            <Text color="#aba1ca" fontSize={"md"} > Or for more advanced user: </Text>
            <Text color="#aba1ca" fontSize={"md"} > - Select a template </Text>
            <Text color="#aba1ca" fontSize={"md"} > - Download it </Text>
            <Text color="#aba1ca" fontSize={"md"} > - Upload & Edit On the <Link href="https://ide.graphlinq.io" color="blue.900" fontSize={"md"}>IDE</Link><Text> to suit their needs</Text>
            </Text>
            <Text color="#aba1ca" fontSize={"md"} textAlign="center"> 
              You can also make your own custom Graph from scratch using our <Link href="https://ide.graphlinq.io" color="blue.900" fontSize={"md"}>IDE </Link>
            </Text>
          </Box>
        </VStack>
      </ScrollView>
  </View>
  )
};

const TemplatesList = (props : any) => {
  const [graphName, setGraphName] = useState('');

  return (
      <Box justifyContent={"center"} flexDirection={"column"} bg="rgb(32,27,64)" borderRadius="12" px={["7","10","15"]} py={["3","5","7"]} mb="5">
          <Box justifyContent={"left"} >
          <Text color="white" fontSize={"xl"} bold mb="3"> Name Your Graph:</Text>
          <Input variant="underlined" color="#aba1ca" fontSize={"md"} mb="7" placeholder="Graph Name" value={props.graphName} onChange={(e) => { props.setGraphName(e.target.value) }}/>
          <Text color="white" fontSize={"xl"} bold mb="2"> Templates:</Text>
          </Box>
          
          <ScrollView h="200">
          {props.templateLoaded
          ? <FlatList numColumns={2} m="1" data={props.templates}//props.templates
              renderItem={({
                item
              }) => {
              return <Pressable w="50%" p="1" onPress={() => { props.selectTemplate(item.key);}}>
                  {({isPressed,isFocused, }) => {
                  return <Box 
                  borderColor={isPressed?"rgb(7,125,255)": isFocused ? "rgb(7,125,255)" : "#aba1ca"} 
                  borderWidth="2" 
                  alignItems={"center"} style={{
                      borderRadius: 32,
                      alignContent: "center",
                  }}
                  bg="transparent"  h="100%"
                  >
                  <Image src={item.customImg} w="50" h="100" style={{resizeMode:"contain"}}/>
                  <Text color="#aba1ca" fontSize={"xs"} textAlign="center">{item.title}</Text>
              </Box>
              }}
              </Pressable>
            }} />
              : 
              <View alignItems={'center'} justifyContent="center">
                <Spinner
                  color="#15122b"
                  size={"md"}
                  
                />
              </View>
          }
          </ScrollView>
          {props.template.loaded &&
              <Center>
                <View w='80%'m='2' justifyContent={'center'}>
                  <Button bgColor={'transparent'} borderRadius={"12"} variant={'outline'} m="1" _hover={{ bgColor: "#2334ff", borderColor: '#2334ff', color: "white" }}  onPress={()=> {Linking.openURL(`data:text/plain;charset=utf-8,${encodeURIComponent(props.template.template.bytes)}`)}}><Text color="#aba1ca" fontSize={"md"} bold>Download.GLQ</Text></Button>
                  <Button bgColor={'transparent'} borderRadius={"12"} variant={'outline'}  m="1"  _hover={{ bgColor: "#2334ff", borderColor: '#2334ff', color: "white" }} onPress={() => {Linking.openURL(`https://ide.graphlinq.io/?loadGraph=${props.template.template.idgraphsTemplates}`);}}><Text bold color="#aba1ca" fontSize={"md"}>Edit on IDE</Text></Button>
                  <Button bgColor="#2334ff" borderRadius={'12'} _pressed={{transform: [{scale: 0.96}]}} color="white"  _hover={{ bgColor: "#202cc3" }} onClick={() => { props.updateStep(); console.log(props.graphName)} } isDisabled={!props.graphName} isLoading={props.isLoading} isLoadingText="Loading">Next</Button>
                </View>
              </Center>
            }
    </Box>
  )
};

const graphDetails = {
  template: [
      "Watcher Coingecko Bitcoin Price Print",
      "Watcher Gas price From Ethereum Chain",
      "Watch New Ethereum Blocks",
      "Pancake Swap Pair Watcher",
      "Watch Unicrypt New Deposit",
      "Watch Unicrypt Presale Telegram"
  ],
  description: [
      'Watch over bitcoin price on Coingecko and print result',
      'Watch ethereum gas price in real time',
      'Watch events from every new blocks received on the Ethereum Chain',
      'Watch over a pair on pancake and get notified on new swaps',
      'Watch new deposit on UniCrypt platform',
      'Watch activities on a specific presale from Unicrypt and report to Telegram',
  ],
  templateParams: [
      {
          id:"1",
          title: 'Watch Interval (in seconds)',
          value: '300'
      },
      {
          id:"2",
          title: 'Symbol to watch',
          value: 'bitcoin'
      },
      {
          id:"3",
          title: 'Log Message',
          value: 'Bitcoin price is {0}$ for 24h change of {1}'
      },
      {
          id:"4",
          title: 'Message variable (Price)',
          value: '{0}'
      },
      {
          id:"5",
          title: 'Message variable (MarketCap Change 24h)',
          value: '{1}'
      },
  ]
};

const TemplateVars = (props:any) => {

  const [deployButtonClick, setDeployButtonClick] = useState(false);

  const ShowAlertWithDelay=()=>{

      setTimeout(function(){
              
      }, 1000);
  }  

  return (
       <VStack justifyContent={"center"} bg="rgb(32,27,64)" borderRadius="12" px={["7","10","15"]} py={["3","5","7"]} mb="5">
          <Text color="white" fontSize={"xl"} bold mb="3"> {props.graphName}:</Text>
          <Text color="#aba1ca" fontSize={"lg"} mb="3">Template: {graphDetails.template[props.templateID]}</Text>
          <Text color="#aba1ca" fontSize={"lg"} mb="3">Description: {graphDetails.description[props.templateID]}</Text>
          {graphDetails.templateParams.map((element) => {
              return (
                  <VStack mb="3" key={element.id}>
                      <FormControl isRequired>
                          <FormControl.Label color="#aba1ca" fontSize={"lg"}>{element.title}</FormControl.Label>
                          <Input variant={"underlined"} color="#aba1ca" fontSize={"sm"} value={element.value} />
                      </FormControl>
                  </VStack>
              );
          })
          }
          <HStack justifyContent={"right"} my="5">
              <Button variant={"outline"} borderRadius="12" borderColor={"#aba1ca"} mr="3" onPress={() => {}}>
                  <Text color="#aba1ca" fontSize={"md"} bold >Previous</Text>
              </Button> 
              <Button variant={"solid"} borderRadius="12" onPress={() => {setDeployButtonClick(true);}}>
              {deployButtonClick===false?
              (<Text color="white" fontSize={"md"} bold >Deploy</Text>)
              :(<View flexDirection={"row"}>
                      <Spinner color="white" size="sm" accessibilityLabel="Loading posts" mx="3"/>
                      <Text color="white" bold fontSize={"lg"}>Loading</Text>
                  </View>)
              }
              </Button>
          </HStack>
      </VStack>
  )
};

export default Templates;