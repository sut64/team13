package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut64/team13/controller"
	"github.com/sut64/team13/entity"
	middlewares "github.com/sut64/team13/middleware"
)

func main() {

	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())
	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// Insurance

			protected.GET("/insrs", controller.ListInsurance)

			protected.POST("/insr", controller.CreateInsurance)

			// Job

			protected.GET("/jobs", controller.ListJob)

			protected.POST("/job", controller.CreateJob)

			// Patient

			protected.GET("/patients", controller.ListPatient)

			protected.POST("/patient", controller.CreatePatient)

			protected.PATCH("/patient", controller.UpdatePatient)

			protected.DELETE("/patient/:id", controller.DeletePatient)

			// Sex

			protected.GET("/sexs", controller.ListSex)

			protected.POST("/sex", controller.CreateSex)

			// user

			protected.GET("/users", controller.ListUser)

			protected.GET("/users/:id", controller.GetUser)

			// role
			protected.GET("/roles", controller.ListRole)

			protected.POST("/role", controller.CreateRole)

			// Appoint
			protected.GET("/appoints", controller.ListAppoint)
			protected.POST("/appoint", controller.CreateAppoint)

			// RemedyType
			protected.GET("/remedy_types", controller.ListRemedyType)
			protected.POST("/remedy_type", controller.CreateRemedyType)

			// Screenings
			protected.POST("/screening", controller.CreateScreening)
			protected.GET("/screenings", controller.ListScreening)

			// Treatments
			protected.POST("/treatment", controller.CreateTreatment)
			protected.GET("/treatments", controller.ListTreatments)

			// Payments
			protected.GET("/payments", controller.ListPayment)
			protected.GET("/payment/:id", controller.GetPayment)
			protected.POST("/payments", controller.CreatePayment)
			protected.PATCH("/payments", controller.UpdatePayment)
			protected.DELETE("/payments/:id", controller.DeletePayment)

			// MedRecord
			protected.GET("/medrecords", controller.ListMedRecord)
			protected.POST("/medsubmit", controller.CreateMedRecord)

			// MedicalProduct
			protected.GET("/medical_products", controller.ListMedicalProduct)
		}
	}

	// Authentication Routes
	r.POST("/login", controller.Login)

	// Run the server

	r.Run()

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")

		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT ,DELETE ,PATCH")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)

			return

		}

		c.Next()

	}

}
