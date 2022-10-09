#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use tauri::Manager;
use tauri_plugin_store::PluginBuilder;

fn main() {
    tauri::Builder::default()
        .plugin(PluginBuilder::default().build())
        // .setup(|app| {
        //     #[cfg(debug_assertions)] // only include this code on debug builds
        //     {
        //         let window = app.get_window("main").unwrap();
        //         window.open_devtools();
        //     }
        //     Ok(())
        // })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
