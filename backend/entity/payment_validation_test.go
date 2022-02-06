package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPaymentPass(t *testing.T) {
	g := NewGomegaWithT(t)

	// ข้อมูลถูกต้องหมดทุก field
	Payment := Payment{
		Price:     500.00,
		Pricetext: "ห้าร้อยบาทถ้วน",
		Paytime:   time.Now().Add(-20 * time.Hour),
		Note:      "",
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Payment)

	// ok ต้องเป็น true แปลว่าไม่มี error
	g.Expect(ok).To(BeTrue())

	// err เป็นค่า nil แปลว่าไม่มี error
	g.Expect(err).To(BeNil())
}

func TestPricetextNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	Payment := Payment{
		Price:     500.00,
		Pricetext: "",
		Paytime:   time.Now().Add(-20 * time.Hour),
		Note:      "",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Payment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Pricetext cannot be blank"))
}

func TestPayTimeMustBeInThePast(t *testing.T) {
	g := NewGomegaWithT(t)
	Payment := Payment{
		Price:     500.00,
		Pricetext: "ห้าร้อยบาทถ้วน",
		Paytime:   time.Now().Add(24 * time.Hour),
		Note:      "",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Payment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Pay time must be a past date"))
}

func TestCostNotLessThanZero(t *testing.T) {
	g := NewGomegaWithT(t)

	Payment := Payment{
		Price:     -500.00,
		Pricetext: "ห้าร้อยบาทถ้วน",
		Paytime:   time.Now().Add(-20 * time.Hour),
		Note:      "",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Payment)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Price cannot be negative"))
}
