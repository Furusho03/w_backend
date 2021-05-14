
1 まずはじめにターミナルで backend フォルダーに移動して npm install をしてください

2 つぎにフォルダー内に .env　ファイルを作って .env内につぎを書いてください

　PORT=ポート番号  5000, 8000 など数字を入れてください

　MONGODB_URI='MONGODBのURLを入れてください'　 localならmongodb://localhost:27017/データベース名

　JWT_SECRET_KEY="シークレットキーを入れてください　どんな文字でもいいです"

2.5 次にターミナルで node seed/seeder.js -d を行って一旦データベース内をクリーンアップします

3 次にターミナルで　node seed/seeder.js を行ってください　

4 つぎに npm start でサーバーを起動してください

5 お使いのブラウザーの拡張機能に Redux DevTools　をインストールしてください

6 うまくサーバーが立ち上がったらもう一つターミナルを開いて client フォルダーに移動してください

7 client の package.json の proxy を http://localhost:バックエンドのポート に書き換えてください

8 そして npm install を行い　npm start
