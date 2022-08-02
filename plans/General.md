# **Botschiee**
> A Discord bot with a web dashboard. Botschiee is my old project to learn Python, now i am expending the project and taking the concept a step feather wit a Dashboard. 



## **Feature Separation/List**
----
| Feature | Free | Premium |
| ------- | ---- |-------- |
| Custom Prefix | Yes | Yes
| Restoring config | Yes | Yes
| Custom welcome message | Yes | Yes
| Custom welcome embed | No | Yes
| Exporting config | No | Yes



## **Processing Guild Configurations**
---
> The User has different options to handel/save/use there own Bot/Guild configurations. The config size will be ca. *1.5 MB*. 
### **Kicking the Bot**
- When you kick the Bot your server config will be archived. The config gets stored on the server for _30 days_, after _30 days_ the save got deleted. Should the user add the bot within the _30 days_ to the guild again the config gets applied and **deleted**.

### **Reset the config**
- If you don't want to use the saved config, you can reset the config in the Dashboard or with a command (*resetConfig*). If you reset your config your old config get saved for _30 days_ in the Dashboard where you can restore/download your configs.

### **Share the configs**
- In the Dashboard you can share your configs. The config will get exported as a JSON file, you can select witch settings should get exported. The JSON file can be uploaded to overwrite the existing settings, you can select again which settings you want to import.

### Removing the Bot over the Dashboard
- If you remove the Bot over the dashboard you will get prompted to chose between saving or deleting your configs.
