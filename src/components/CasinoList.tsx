import React from "react";
import { useSelector } from "react-redux";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CircularProgress,
	Grid,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";
import { Check, Star, StarBorder } from "@mui/icons-material";
import { RootState } from "../redux/store";
import { Link as RouterLink } from "react-router-dom";

const CasinoList: React.FC = () => {
	const casinos = useSelector((state: RootState) => state.casino.data);

	// Function to render stars based on the rating
	const renderStars = (rating: number) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			stars.push(i <= rating ? <Star key={i} /> : <StarBorder key={i} />);
		}
		return stars;
	};

	return (
		<Grid container>
			{/* Header row */}
			<Grid
				item
				xs={12}
				style={{ backgroundColor: "#FFA500", padding: "1rem" }}
			>
				<Grid container alignItems="center">
					{/* Column headers */}
					<Grid item xs={12} md={3}>
						<Typography variant="h6">Casino</Typography>
					</Grid>
					<Grid item xs={12} md={3}>
						<Typography variant="h6">Bonus</Typography>
					</Grid>
					<Grid item xs={12} md={4}>
						<Typography variant="h6">Features</Typography>
					</Grid>
					<Grid item xs={12} md={2}>
						<Typography variant="h6">Play</Typography>
					</Grid>
				</Grid>
			</Grid>
			{/* Casino items */}
			{casinos && casinos.length ? (
				[...casinos] // copy the array to prevent modifying the original state data in a mutable way
					.map((casino) => (
						<Grid item xs={12} key={casino.brand_id}>
							<Card style={{ marginBottom: 16 }}>
								<CardContent>
									<Grid container alignItems="center">
										{/* Casino logo and review button */}
										<Grid item xs={12} md={3}>
											<div style={{ textAlign: "center" }}>
												<Button
													href={`${process.env.PUBLIC_URL}/${casino.brand_id}`}
													color="primary"
													style={{ padding: 0 }}
												>
													<img
														src={casino.logo}
														alt={`${casino.brand_id} logo`}
														width="100"
													/>
												</Button>
												<Button
													href={`${process.env.PUBLIC_URL}/${casino.brand_id}`}
													color="primary"
													style={{ marginTop: 8, display: "block" }}
												>
													Review
												</Button>
											</div>
										</Grid>
										{/* Rating stars and bonus */}
										<Grid item xs={12} md={3}>
											<div style={{ textAlign: "center" }}>
												<span
													style={{
														display: "flex",
														alignItems: "center",
														color: "#FFA500",
														justifyContent: "center",
													}}
												>
													{renderStars(casino.rating)}
												</span>
												<Typography style={{ marginTop: 8 }}>
													{casino.bonus}
												</Typography>
											</div>
										</Grid>
										{/* Features */}
										<Grid item xs={12} md={4}>
											<Grid
												container
												direction="column"
												alignItems="center"
												justifyContent="center"
											>
												<div>
													{casino.features.map(
														(feature: string, index: number) => (
															<ListItem key={index} style={{ padding: 0 }}>
																<ListItemIcon style={{ minWidth: 36 }}>
																	<Check />
																</ListItemIcon>
																<ListItemText primary={feature} />
															</ListItem>
														)
													)}
												</div>
											</Grid>
										</Grid>
										{/* Play Now button and T&Cs */}
										<Grid item xs={12} md={2}>
											<Grid
												container
												direction="column"
												alignItems="center"
												justifyContent="center"
											>
												<CardActions>
													<Button
														variant="contained"
														style={{ backgroundColor: "green" }}
														href={casino.play_url}
														target="_blank"
														rel="noopener noreferrer"
													>
														Play Now
													</Button>
												</CardActions>
												<Typography
													variant="body2"
													component="p"
													style={{ marginTop: 8 }}
												>
													21+ |{" "}
													<a
														href={casino.terms_and_conditions}
														target="_blank"
														rel="noreferrer"
													>
														T&Cs Apply
													</a>{" "}
													| Gamble Responsibly
												</Typography>
											</Grid>
										</Grid>
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					))
			) : (
				<Grid item xs={12} style={{ textAlign: "center", padding: "2rem" }}>
					<CircularProgress />
				</Grid>
			)}
			<Grid container justifyContent="center">
				<div style={{ marginTop: "2rem" }}>
					<Button
						component={RouterLink}
						to="/admin"
						variant="contained"
						color="primary"
					>
						Go to Admin Area
					</Button>
				</div>
			</Grid>
		</Grid>
	);
};

export default CasinoList;
