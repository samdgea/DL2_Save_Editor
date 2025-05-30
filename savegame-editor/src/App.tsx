import "./App.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { MainPage } from "./pages/main-page";
import { useEffect, useState } from "react";
import {
  IdData,
  OutpostSave,
  PatchedItems,
  SaveFile,
} from "./models/save-models";
import { SettingsPage } from "./pages/settings-page";
import { AppSettings, SettingState } from "./models/settings-model";
import { SkillsPage } from "./pages/skills-page";
import { InventoryPage } from "./pages/inventory-page";
import { UnlockablesPage } from "./pages/unlockables-page";
import { BackpackPage } from "./pages/backpack-page";
import { CampaignPage } from "./pages/campaign-page";
import { IDsPage } from "./pages/ids-page";
import { PlayerPage } from "./pages/player-page";
import { KnowledgeVaultPage } from "./pages/knowledge-vault";
import { DebugPage } from "./pages/debug-page";
import { SponsorPage } from "./pages/sponsor-page";
import { WelcomePage } from "./pages/welcome-page";
import { Store } from "@tauri-apps/plugin-store";
import {
  initializeAppSettings,
  initializeStore,
} from "./models/settings-manager";
import { HawksOutpostPage } from "./pages/outpost-page";
import { PatchedItemsPage } from "./pages/patched-items-page";

function App() {
  // Declare app settings manager
  const appSettings: AppSettings = initializeAppSettings();
  const [settingsManager, setSettingsManager] = useState<Store>();

  useEffect(() => {
    const initialize = async () => {
      const store = await initializeStore(appSettings);
      setSettingsManager(store);
    };

    initialize();
  }, []);

  // Declare savefile state
  const [currentSaveFileValue, setCurrentSaveFile] = useState<SaveFile>();
  const currentSaveFile: SettingState<SaveFile | undefined> = {
    value: currentSaveFileValue,
    setValue: setCurrentSaveFile,
  };

  // Declare IDs state
  const [idDataValue, setIdData] = useState<IdData[]>();
  const idData: SettingState<IdData[] | undefined> = {
    value: idDataValue,
    setValue: setIdData,
  };

  // Declare outpost saves state
  const [outpostSavesValue, setOutpostSaves] = useState<OutpostSave[]>();
  const outpostSaves: SettingState<OutpostSave[] | undefined> = {
    value: outpostSavesValue,
    setValue: setOutpostSaves,
  };

  // Declare Patched Items state
  const [patchedItemsValue, setPatchedItems] = useState<PatchedItems>();
  const patchedItems: SettingState<PatchedItems | undefined> = {
    value: patchedItemsValue,
    setValue: setPatchedItems,
  };

  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route
        path={"/"}
        element={<WelcomePage appSettings={appSettings} />}
      ></Route>,
      <Route
        path={"/main"}
        element={
          <MainPage
            appSettings={appSettings}
            currentSaveFile={currentSaveFile}
            idData={idData}
            patchedItems={patchedItems}
          />
        }
      ></Route>,
      <Route
        path={"/settings"}
        element={
          <SettingsPage
            appSettings={appSettings}
            settingsManager={settingsManager}
          />
        }
      ></Route>,
      <Route
        path={"/skills"}
        element={
          <SkillsPage
            skills={currentSaveFile.value?.skills}
            currentSaveFile={currentSaveFile}
          />
        }
      ></Route>,
      <Route
        path={"/inventory"}
        element={
          <InventoryPage
            currentSaveFile={currentSaveFile}
            currentIdData={idData}
            appSettings={appSettings}
          />
        }
      ></Route>,
      <Route
        path={"/unlockables"}
        element={
          <UnlockablesPage
            unlockables={currentSaveFile.value?.unlockable_items}
          />
        }
      ></Route>,
      <Route path={"/backpack"} element={<BackpackPage />}></Route>,
      <Route path={"/campaign"} element={<CampaignPage />}></Route>,
      <Route path={"/player"} element={<PlayerPage />}></Route>,
      <Route path={"/ids"} element={<IDsPage ids={idData.value} />}></Route>,
      <Route
        path={"/knowledge-vault"}
        element={<KnowledgeVaultPage />}
      ></Route>,
      <Route
        path={"/debug"}
        element={<DebugPage log_history={currentSaveFile.value?.log_history} />}
      ></Route>,
      <Route path={"/sponsor"} element={<SponsorPage />}></Route>,
      <Route
        path={"/hawks-outpost"}
        element={
          <HawksOutpostPage
            currentSaveFile={currentSaveFile}
            outpostSaves={outpostSaves}
          />
        }
      ></Route>,
      <Route
        path={"/patched-items"}
        element={<PatchedItemsPage patchedItems={patchedItems.value} />}
      ></Route>,
    ])
  );

  return (
    <ThemeProvider
      defaultTheme="dl2"
      storageKey="vite-ui-theme"
      appSettings={appSettings}
      settingsManager={settingsManager}
    >
      <div className="bg-muted/40 background-image-container">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
