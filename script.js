// "Client-side" stuff

const PING_TARGETS = [
	{ name: "PC-TOM", target: "localhost" },
	{ name: "sam", target: "192.168.50.69" },
	{ name: "royer", target: "192.168.50.96" },
	{ name: "jo", target: "artivain.com" },
	{ name: "techno", target: "techno.artivain.com" },
	{ name: "justin", target: "justin.artivain.com" },
	// { name: "analytics", target: "analytics.artivain.com" },
	{ name: "tracy", target: "tracy.artivain.com" }
]

const pingList = document.getElementById("ping-list");

PING_TARGETS.forEach(({ name }, i) => {
	console.log("sus");
	const element = document.createElement("li");
	element.classList.add("text-success");
	element.innerText = `${name}: `;
	element.id = "ping" + i;
	pingList.appendChild(element);
});

function loop() {
	checkPing();
}

async function checkPing() {
	PING_TARGETS.forEach(async ({ name, target }, i) => {
		let latency = await ping(target);

		let className = "text-success";
		if (isNaN(latency)) {
			className = "text-danger";
			latency = "sus";
		} else if (latency > 200) {
			className = "text-warning";
		}

		const element = document.getElementById("ping" + i);
		element.className = className;
		element.innerText = `${name}: ${isNaN(latency) ? "sus" : latency + " ms"}`;
	});
}

setInterval(loop, 10000);
loop();