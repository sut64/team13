package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut64/team13/entity"
)

// POST /Appoint
func CreateAppoint(c *gin.Context) {

	var appoint entity.Appoint
	var patient entity.Patient
	var remedytype entity.RemedyType
	var user entity.User

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Appoint
	if err := c.ShouldBindJSON(&appoint); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา patient ด้วย id
	if tx := entity.DB().Where("id = ?", appoint.PatientID).First(&patient); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "patient not found"})
		return
	}

	// 9: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", appoint.DentistID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	entity.DB().Joins("Role").Find(&user)

	// 10: ตรวจสอบ Role ของ user
	if user.Role.Name != "Dentist" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Only dentist can save appointments !!"})
		return
	}

	// 11: ค้นหา remedytype ด้วย id
	if tx := entity.DB().Where("id = ?", appoint.RemedyTypeID).First(&remedytype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "remedytype not found"})
		return
	}

	// 12: สร้าง Appoint
	ap := entity.Appoint{
		Patient:     patient,    // โยงความสัมพันธ์กับ Entity Patient
		RemedyType:  remedytype, // โยงความสัมพันธ์กับ Entity RemedyType
		Dentist:     user,       // โยงความสัมพันธ์กับ Entity User
		Room:        appoint.Room,
		Todo:        appoint.Todo,
		AppointTime: appoint.AppointTime, // ตั้งค่าฟิลด์ Time
	}

	// 13: บันทึก
	if err := entity.DB().Create(&ap).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error create appoint": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ap})
}

// GET /Appoint/:id
func GetAppoint(c *gin.Context) {
	var appoint entity.Appoint
	id := c.Param("id")
	if err := entity.DB().Preload("Patient").Preload("RemedyType").Preload("User").Raw("SELECT * FROM appoints WHERE id = ?", id).Find(&appoint).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": appoint})
}

// GET /Appoint
func ListAppoint(c *gin.Context) {
	var appoints []entity.Appoint
	if err := entity.DB().Preload("Patient").Preload("RemedyType").Preload("Dentist").Raw("SELECT * FROM appoints").Find(&appoints).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": appoints})
}
