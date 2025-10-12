import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import { Welcome } from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import LearnJava from './components/LearnJava';
import LearnSpring from './pages/LearnSpring';
import { AuthProvider } from './context/AuthContext';
import { expandWebApp, tgRequestFullscreen, onTgFullscreenChanged, getTelegramWebApp } from './utils/telegram';

// Import topic pages
import IntroductionToJava from './components/learn/java/topics/IntroductionToJava';
import SettingUpWorkspace from './components/learn/java/topics/SettingUpWorkspace';
import Commandsandthefirstprogram from './components/learn/java/topics/Commandsandthefirstprogram';
import Basicsyntax from './components/learn/java/topics/Basicsyntax';
import Controlflowstatements from './components/learn/java/topics/Controlflowstatements';
import Workingwithstrings from './components/learn/java/topics/Workingwithstrings';
import Arrays from './components/learn/java/topics/Arrays';
import Methods from './components/learn/java/topics/Methods';
import Inputhandling from './components/learn/java/topics/Inputhandling';
import Errorsanddebugging from './components/learn/java/topics/Errorsanddebugging';

// Import lesson pages
import PurposeandareasofapplicationofJava from './components/learn/java/lessons/introduction-to-java/PurposeandareasofapplicationofJava';
import Principlesofplatformindependence from './components/learn/java/lessons/introduction-to-java/Principlesofplatformindependence';
import ComponentsoftheJavaecosystem from './components/learn/java/lessons/introduction-to-java/ComponentsoftheJavaecosystem';

import InstallingandverifyingtheJDK from './components/learn/java/lessons/setting-up-workspace/InstallingandverifyingtheJDK';
import Configuringthedevelopmentenvironment from './components/learn/java/lessons/setting-up-workspace/Configuringthedevelopmentenvironment';
import Projectstructureandfileorganization from './components/learn/java/lessons/setting-up-workspace/Projectstructureandfileorganization';
import Compilationandprogramexecution from './components/learn/java/lessons/setting-up-workspace/Compilationandprogramexecution';

import StructureofaJavaprogram from './components/learn/java/lessons/commands-and-first-program/StructureofaJavaprogram';
import Classandthemainmethod from './components/learn/java/lessons/commands-and-first-program/Classandthemainmethod';
import Outputtotheconsole from './components/learn/java/lessons/commands-and-first-program/Outputtotheconsole';

import Primitivedatatypes from './components/learn/java/lessons/basic-syntax/Primitivedatatypes';
import Variablesandconstants from './components/learn/java/lessons/basic-syntax/Variablesandconstants';
import Comparisonoperators from './components/learn/java/lessons/basic-syntax/Comparisonoperators';
import Arithmeticandlogicaloperations from './components/learn/java/lessons/basic-syntax/Arithmeticandlogicaloperations';
import Commentsandcodeformattingrules from './components/learn/java/lessons/basic-syntax/Commentsandcodeformattingrules';
import Variablescope from './components/learn/java/lessons/basic-syntax/Variablescope';

import Conditionalstatements from './components/learn/java/lessons/control-flow-statements/Conditionalstatements';
import Loops from './components/learn/java/lessons/control-flow-statements/Loops';
import Controlflowoperators from './components/learn/java/lessons/control-flow-statements/Controlflowoperators';
import Usingbreakinnestedloops from './components/learn/java/lessons/control-flow-statements/Usingbreakinnestedloops';

import Stringliteralsandescapesequences from './components/learn/java/lessons/working-with-strings/Stringliteralsandescapesequences';
import TheStringclassanditsmainmethods from './components/learn/java/lessons/working-with-strings/TheStringclassanditsmainmethods';
import Stringimmutability from './components/learn/java/lessons/working-with-strings/Stringimmutability';
import Concatenationandperformanceconsiderations from './components/learn/java/lessons/working-with-strings/Concatenationandperformanceconsiderations';
import UsingStringBuilderandStringBuffer from './components/learn/java/lessons/working-with-strings/UsingStringBuilderandStringBuffer';
import Wrapperclassesforprimitivetypes from './components/learn/java/lessons/working-with-strings/Wrapperclassesforprimitivetypes';
import Basicsofmemorymanagement from './components/learn/java/lessons/working-with-strings/Basicsofmemorymanagement';

import Creationandinitializationofarrays from './components/learn/java/lessons/arrays/Creationandinitializationofarrays';
import OneDimensionalAndMultidimensionalArrays from './components/learn/java/lessons/arrays/OneDimensionalandmultidimensionalarrays';
import Iteratingoverarrays from './components/learn/java/lessons/arrays/Iteratingoverarrays';
import TheArraysclassanditsmethods from './components/learn/java/lessons/arrays/TheArraysclassanditsmethods';
import Featuresandlimitationsofarrays from './components/learn/java/lessons/arrays/Featuresandlimitationsofarrays';

import Purposeandstructureofamethod from './components/learn/java/lessons/methods/Purposeandstructureofamethod';
import MethodSignatureParametersAndReturnType from './components/learn/java/lessons/methods/MethodSignatureParametersAndReturnType';
import Passingargumentstomethods from './components/learn/java/lessons/methods/Passingargumentstomethods';
import Methodoverloading from './components/learn/java/lessons/methods/Methodoverloading';
import Thestatickeywordanditsusage from './components/learn/java/lessons/methods/Thestatickeywordanditsusage';
import Variablescopewithinamethod from './components/learn/java/lessons/methods/Variablescopewithinamethod';

import TheScannerclassanditscapabilities from './components/learn/java/lessons/input-handling/TheScannerclassanditscapabilities';
import Readingdatafromtheconsole from './components/learn/java/lessons/input-handling/Readingdatafromtheconsole';
import Processinguserinput from './components/learn/java/lessons/input-handling/Processinguserinput';
import ExampleSimpleCalculatorImplementation from './components/learn/java/lessons/input-handling/ExampleSimpleCalculatorImplementation';

import Typesoferrors from './components/learn/java/lessons/errors-and-debugging/Typesoferrors';
import Basicsofexceptionhandling from './components/learn/java/lessons/errors-and-debugging/Basicsofexceptionhandling';
import Exceptionhierarchy from './components/learn/java/lessons/errors-and-debugging/Exceptionhierarchy';
import TryCatchAndFinallyBlocks from './components/learn/java/lessons/errors-and-debugging/TryCatchAndFinallyBlocks';
import BasicdebuggingtechniquesintheIDE from './components/learn/java/lessons/errors-and-debugging/BasicdebuggingtechniquesintheIDE';

function App() {
  const [isTelegram, setIsTelegram] = useState<boolean | null>(null);

  useEffect(() => {

    const webApp = getTelegramWebApp();
    const isInTelegram = !!(webApp && webApp.initData);
    setIsTelegram(isInTelegram);

    if (isInTelegram) {
      expandWebApp();
      tgRequestFullscreen();
      onTgFullscreenChanged(() => {

      });
    }
  }, []);


  if (isTelegram === false) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3E2D0',
        fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '400px',
          backgroundColor: '#3B5635',
          color: '#F3E2D0',
          padding: '40px 30px',
          borderRadius: '20px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px', margin: '0 0 20px 0' }}>
            📱 Telegram Required
          </h1>
          <p style={{ fontSize: '16px', lineHeight: '1.5', margin: '0 0 20px 0' }}>
            This app can only be accessed through Telegram. Please open it in your Telegram app.
          </p>
          <p style={{ fontSize: '14px', opacity: 0.8, margin: '0' }}>
            Open this link in Telegram to continue.
          </p>
        </div>
      </div>
    );
  }

  // Show loading while checking
  if (isTelegram === null) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3E2D0',
        fontFamily: '"Arial Rounded MT Bold", "Apple Symbols", Arial, sans-serif'
      }}>
        <div style={{ fontSize: '18px', color: '#3B5635' }}>Loading...</div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/learn/java" element={<LearnJava />} />
          
          {/* Topic routes */}
          <Route path="/learn/java/introduction-to-java" element={<IntroductionToJava />} />
          <Route path="/learn/java/setting-up-workspace" element={<SettingUpWorkspace />} />
          <Route path="/learn/java/commands-and-first-program" element={<Commandsandthefirstprogram />} />
          <Route path="/learn/java/basic-syntax" element={<Basicsyntax />} />
          <Route path="/learn/java/control-flow-statements" element={<Controlflowstatements />} />
          <Route path="/learn/java/working-with-strings" element={<Workingwithstrings />} />
          <Route path="/learn/java/arrays" element={<Arrays />} />
          <Route path="/learn/java/methods" element={<Methods />} />
          <Route path="/learn/java/input-handling" element={<Inputhandling />} />
          <Route path="/learn/java/errors-and-debugging" element={<Errorsanddebugging />} />
          
          {/* Lesson routes - Introduction to Java */}
          <Route path="/learn/java/introduction-to-java/purpose-and-applications" element={<PurposeandareasofapplicationofJava />} />
          <Route path="/learn/java/introduction-to-java/platform-independence" element={<Principlesofplatformindependence />} />
          <Route path="/learn/java/introduction-to-java/java-ecosystem" element={<ComponentsoftheJavaecosystem />} />
          
          {/* Lesson routes - Setting up workspace */}
          <Route path="/learn/java/setting-up-workspace/installing-jdk" element={<InstallingandverifyingtheJDK />} />
          <Route path="/learn/java/setting-up-workspace/configuring-ide" element={<Configuringthedevelopmentenvironment />} />
          <Route path="/learn/java/setting-up-workspace/project-structure" element={<Projectstructureandfileorganization />} />
          <Route path="/learn/java/setting-up-workspace/compilation-and-execution" element={<Compilationandprogramexecution />} />
          
          {/* Lesson routes - Commands and first program */}
          <Route path="/learn/java/commands-and-first-program/program-structure" element={<StructureofaJavaprogram />} />
          <Route path="/learn/java/commands-and-first-program/class-and-main-method" element={<Classandthemainmethod />} />
          <Route path="/learn/java/commands-and-first-program/console-output" element={<Outputtotheconsole />} />
          
          {/* Lesson routes - Basic syntax */}
          <Route path="/learn/java/basic-syntax/primitive-data-types" element={<Primitivedatatypes />} />
          <Route path="/learn/java/basic-syntax/variables-and-constants" element={<Variablesandconstants />} />
          <Route path="/learn/java/basic-syntax/comparison-operators" element={<Comparisonoperators />} />
          <Route path="/learn/java/basic-syntax/arithmetic-and-logical-operations" element={<Arithmeticandlogicaloperations />} />
          <Route path="/learn/java/basic-syntax/comments-and-formatting" element={<Commentsandcodeformattingrules />} />
          <Route path="/learn/java/basic-syntax/variable-scope" element={<Variablescope />} />
          
          {/* Lesson routes - Control flow statements */}
          <Route path="/learn/java/control-flow-statements/conditional-statements" element={<Conditionalstatements />} />
          <Route path="/learn/java/control-flow-statements/loops" element={<Loops />} />
          <Route path="/learn/java/control-flow-statements/control-flow-operators" element={<Controlflowoperators />} />
          <Route path="/learn/java/control-flow-statements/break-in-nested-loops" element={<Usingbreakinnestedloops />} />
          
          {/* Lesson routes - Working with strings */}
          <Route path="/learn/java/working-with-strings/string-literals" element={<Stringliteralsandescapesequences />} />
          <Route path="/learn/java/working-with-strings/string-class-methods" element={<TheStringclassanditsmainmethods />} />
          <Route path="/learn/java/working-with-strings/string-immutability" element={<Stringimmutability />} />
          <Route path="/learn/java/working-with-strings/concatenation-performance" element={<Concatenationandperformanceconsiderations />} />
          <Route path="/learn/java/working-with-strings/stringbuilder-and-buffer" element={<UsingStringBuilderandStringBuffer />} />
          <Route path="/learn/java/working-with-strings/wrapper-classes" element={<Wrapperclassesforprimitivetypes />} />
          <Route path="/learn/java/working-with-strings/memory-management" element={<Basicsofmemorymanagement />} />
          
          {/* Lesson routes - Arrays */}
          <Route path="/learn/java/arrays/array-creation" element={<Creationandinitializationofarrays />} />
          <Route path="/learn/java/arrays/multidimensional-arrays" element={<OneDimensionalAndMultidimensionalArrays />} />
          <Route path="/learn/java/arrays/iterating-arrays" element={<Iteratingoverarrays />} />
          <Route path="/learn/java/arrays/arrays-class-methods" element={<TheArraysclassanditsmethods />} />
          <Route path="/learn/java/arrays/array-limitations" element={<Featuresandlimitationsofarrays />} />
          
          {/* Lesson routes - Methods */}
          <Route path="/learn/java/methods/method-structure" element={<Purposeandstructureofamethod />} />
          <Route path="/learn/java/methods/method-signature" element={<MethodSignatureParametersAndReturnType />} />
          <Route path="/learn/java/methods/passing-arguments" element={<Passingargumentstomethods />} />
          <Route path="/learn/java/methods/method-overloading" element={<Methodoverloading />} />
          <Route path="/learn/java/methods/static-keyword" element={<Thestatickeywordanditsusage />} />
          <Route path="/learn/java/methods/method-variable-scope" element={<Variablescopewithinamethod />} />
          
          {/* Lesson routes - Input handling */}
          <Route path="/learn/java/input-handling/scanner-class" element={<TheScannerclassanditscapabilities />} />
          <Route path="/learn/java/input-handling/reading-console-input" element={<Readingdatafromtheconsole />} />
          <Route path="/learn/java/input-handling/processing-user-input" element={<Processinguserinput />} />
          <Route path="/learn/java/input-handling/simple-calculator" element={<ExampleSimpleCalculatorImplementation />} />
          
          {/* Lesson routes - Errors and debugging */}
          <Route path="/learn/java/errors-and-debugging/error-types" element={<Typesoferrors />} />
          <Route path="/learn/java/errors-and-debugging/exception-handling-basics" element={<Basicsofexceptionhandling />} />
          <Route path="/learn/java/errors-and-debugging/exception-hierarchy" element={<Exceptionhierarchy />} />
          <Route path="/learn/java/errors-and-debugging/try-catch-finally" element={<TryCatchAndFinallyBlocks />} />
          <Route path="/learn/java/errors-and-debugging/debugging-techniques" element={<BasicdebuggingtechniquesintheIDE />} />
          
          <Route path="/learn/spring" element={<LearnSpring />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;