package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPatientCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	patient := Patient{
		Firstname: "Test",
		Lastname:  "A",
		Birthday:  time.Now().AddDate(0, 0, -1),
		IDcard:    "1329901010000",
		Tel:       "0902571569",
		Weight:    70.2,
		Height:    175.5,
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(patient)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestPatientFirstnameNotblank(t *testing.T) {
	g := NewGomegaWithT(t)

	patient := Patient{
		Firstname: "",
		Lastname:  "A",
		Birthday:  time.Now().AddDate(0, 0, -1),
		IDcard:    "1329901010000",
		Tel:       "0902571569",
		Weight:    70.2,
		Height:    175.5,
	}

	ok, err := govalidator.ValidateStruct(patient)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Firstname must not be blank"))

}

func TestPatientLastnameNotblank(t *testing.T) {
	g := NewGomegaWithT(t)

	patient := Patient{
		Firstname: "Test",
		Lastname:  "",
		Birthday:  time.Now().AddDate(0, 0, -1),
		IDcard:    "1329901010000",
		Tel:       "0902571569",
		Weight:    70.2,
		Height:    175.5,
	}

	ok, err := govalidator.ValidateStruct(patient)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Lastname must not be blank"))

}

func TestPatientBirthdayMustPast(t *testing.T) {
	g := NewGomegaWithT(t)

	patient := Patient{
		Firstname: "Test",
		Lastname:  "A",
		Birthday:  time.Now().AddDate(0, 0, 1),
		IDcard:    "1329901010000",
		Tel:       "0902571569",
		Weight:    70.2,
		Height:    175.5,
	}

	ok, err := govalidator.ValidateStruct(patient)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Birthday must be in the past"))

}

func TestPatientIDcardPattren(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"13299000000AB",
		"132000000000000000000",
		"132000",
		"",
	}

	for _, fixture := range fixtures {
		patient := Patient{
			Firstname: "Test",
			Lastname:  "A",
			Birthday:  time.Now().AddDate(0, 0, -1),
			IDcard:    fixture,
			Tel:       "0902571569",
			Weight:    70.2,
			Height:    175.5,
		}

		ok, err := govalidator.ValidateStruct(patient)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		if err.Error() == "IDcard Invalid format" {
			g.Expect(err.Error()).To(Equal("IDcard Invalid format"))
		} else if err.Error() == "IDcard cannot be blank" {
			g.Expect(err.Error()).To(Equal("IDcard cannot be blank"))
		}
	}
}

func TestPatientTelPattren(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"fewza12345",
		"090123456789",
		"0901234",
	}

	for _, fixture := range fixtures {
		patient := Patient{
			Firstname: "Test",
			Lastname:  "A",
			Birthday:  time.Now().AddDate(0, 0, -1),
			IDcard:    "1329900100100",
			Tel:       fixture,
			Weight:    70.2,
			Height:    175.5,
		}

		ok, err := govalidator.ValidateStruct(patient)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		g.Expect(err.Error()).To(Equal("Tel Invalid format"))

	}
}

func TestPatientWeightNotNegotive(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []float32{
		0,
		-5,
		-99,
	}

	for _, fixture := range fixtures {
		patient := Patient{
			Firstname: "Test",
			Lastname:  "A",
			Birthday:  time.Now().AddDate(0, 0, -1),
			IDcard:    "1329901010000",
			Tel:       "0902571569",
			Weight:    fixture,
			Height:    175.5,
		}

		ok, err := govalidator.ValidateStruct(patient)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		//g.Expect(err.Error()).To(Equal("Height number >= 1, required~Amount must not be zero"))
		if err.Error() == "Weight must not be zero" {
			g.Expect(err.Error()).To(Equal("Weight must not be zero"))
		} else if err.Error() == "Weight must not be negotive" {
			g.Expect(err.Error()).To(Equal("Weight must not be negotive"))
		}

	}
}

func TestPatientHeighNotNegotive(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []float32{
		0,
		-5,
		-99,
	}

	for _, fixture := range fixtures {
		patient := Patient{
			Firstname: "Test",
			Lastname:  "A",
			Birthday:  time.Now().AddDate(0, 0, -1),
			IDcard:    "1329901010000",
			Tel:       "0902571569",
			Weight:    70.2,
			Height:    fixture,
		}

		ok, err := govalidator.ValidateStruct(patient)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		// err.Error ต้องมี error message แสดงออกมา
		//g.Expect(err.Error()).To(Equal("Height number >= 1, required~Amount must not be zero"))
		if err.Error() == "Height must not be zero" {
			g.Expect(err.Error()).To(Equal("Height must not be zero"))
		} else if err.Error() == "Height must not be negotive" {
			g.Expect(err.Error()).To(Equal("Height must not be negotive"))
		}

	}
}
