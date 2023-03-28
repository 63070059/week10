const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const URL="http://3.85.108.108:8088"

app.post("/image", async (req, res) => {
  console.log(req.body);
	let image = await fetch(URL)
	.then((response) => {
		return response.json()
	})
	.catch((error) => {
		console.log(error);
	})
	res.json(image)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
